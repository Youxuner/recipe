import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/user.model';

const key = 'AIzaSyCM9-CVyBXo0PXIUh5U50uOyxhXKJHCq5Q';
const signUpUrl =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + key;
const loginUrl =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
  key;

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {
  public userSub = new BehaviorSubject<User>(null);
  private logoutTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  public signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(signUpUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => this.handleAuthentication(resData))
      );
  }

  public login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => this.handleAuthentication(resData))
      );
  }

  public autoLogin() {
    let userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return;
    let expirationDate = new Date(userData._tokenExpirationDate);
    let user: User = new User(
      userData.email,
      userData.id,
      userData._token,
      expirationDate
    );

    if (!user.token) return;
    this.userSub.next(user);
    let timeout = user.tokenExpirationDate.getTime() - new Date().getTime();
    this.autoLogout(timeout);
  }

  public logout() {
    this.userSub.next(null);
    localStorage.removeItem('userData');
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
    this.logoutTimer = null;
    this.router.navigate(['auth']);
  }

  public autoLogout(timeout: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, timeout);
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let error: string = 'An unknow error occurred!';

    if (!errorRes.error || !errorRes.error.error) return throwError(error);

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        error = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        error = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        error =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        error = "Email o Password isn't correct.";
        break;
      case 'USER_DISABLED':
        error = 'For this user please contact the administrator.';
        break;
      default:
        error = errorRes.error.error.message;
        break;
    }
    return throwError(error);
  }

  private handleAuthentication(resData: AuthResponseData) {
    let timeout = +resData.expiresIn * 1000;
    let expirationDate = new Date(new Date().getTime() + timeout);
    let user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );

    localStorage.setItem('userData', JSON.stringify(user));
    this.userSub.next(user);
    this.autoLogout(timeout);
  }
}

// let headers = new HttpHeaders({
//   'Content-Type': 'application/json',
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Credentials': 'true',
//   'Access-Control-Allow-Headers': 'Content-Type',
//   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});

// {
//   observe: "response",
//   headers: headers
// }
