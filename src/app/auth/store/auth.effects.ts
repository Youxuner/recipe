import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/user.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import * as act from './auth.actions';

const signupUrl =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
  environment.firebaseAPIKey;
const loginUrl =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
  environment.firebaseAPIKey;

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  authSignup = createEffect(() =>
    this.actions.pipe(
      ofType(act.SIGNUP_START),

      switchMap((authData: act.SignupStart) =>
        this.http
          .post<AuthResponseData>(signupUrl, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          })
          .pipe(
            map((resData: AuthResponseData) =>
              this.handleAuthentication(resData)
            ),
            catchError((error) => this.handleError(error))
          )
      )
    )
  );

  authLogin = createEffect(() =>
    this.actions.pipe(
      ofType(act.LOGIN_START),
      switchMap((authData: act.LoginStart) =>
        this.http
          .post<AuthResponseData>(loginUrl, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          })
          .pipe(
            map((resData: AuthResponseData) =>
              this.handleAuthentication(resData)
            ),
            catchError((error) => this.handleError(error))
          )
      )
    )
  );

  autoLogin = createEffect(() =>
    this.actions.pipe(
      ofType(act.AUTO_LOGIN),
      map(() => {
        let userData = JSON.parse(localStorage.getItem('userData'));

        if (!userData) return { type: 'Ignore' };
        let expirationDate = new Date(userData._tokenExpirationDate);
        let user: User = new User(
          userData.email,
          userData.id,
          userData._token,
          expirationDate,
          false
        );

        if (!user.token) return { type: 'Ignore' };
        let timeout = expirationDate.getTime() - new Date().getTime();
        this.authService.setLogoutTimer(timeout);
        return new act.AuthenticateSuccess(user);
      })
    )
  );

  authLogout = createEffect(
    () =>
      this.actions.pipe(
        ofType(act.LOGOUT),
        tap(() => {
          localStorage.removeItem('userData');
          this.authService.clearLogoutTimer();
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  authRedirection = createEffect(
    () =>
      this.actions.pipe(
        ofType(act.AUTHENTICATE_SUCCESS),
        tap((action: act.AuthenticateSuccess) => {
          if (action.payload.redirect) this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private handleAuthentication(resData: AuthResponseData) {
    let timeout = +resData.expiresIn * 1000;
    let expirationDate = new Date(new Date().getTime() + timeout);
    let user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate,
      true
    );
    localStorage.setItem('userData', JSON.stringify(user));
    this.authService.setLogoutTimer(timeout);
    return new act.AuthenticateSuccess(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let error: string = 'An unknow error occurred!';

    if (!errorRes.error || !errorRes.error.error)
      return of(new act.AuthenticateFail(error));

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        error = $localize`The email address is already in use by another account.`;
        break;
      case 'OPERATION_NOT_ALLOWED':
        error = $localize`Password sign-in is disabled for this project.`;
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        error =
        $localize`We have blocked all requests from this device due to unusual activity. Try again later.`;
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        error = $localize`Email o Password isn't correct.`;
        break;
      case 'USER_DISABLED':
        error = $localize`For this user please contact the administrator.`;
        break;
      default:
        error = errorRes.error.error.message;
        break;
    }
    return of(new act.AuthenticateFail(error));
  }
}
