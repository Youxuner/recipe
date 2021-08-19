import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../shared/user.model';

const key = 'AIzaSyCM9-CVyBXo0PXIUh5U50uOyxhXKJHCq5Q';
const signUpUrl =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + key;
const loginUrl =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + key;

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
  private loggedIn: boolean = false;
  public userSub = new BehaviorSubject<User>(null);
  public user: User;
  constructor(private http: HttpClient) {
    console.log(this.userSub);
  }

  public isAuthenticated() {
    const promise = new Promise((resolve) => {
      resolve(!!this.user);
    });

    return promise;
  }

  public signup(email: string, password: string) {
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Credentials': 'true',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});

    return this.http
      .post<AuthResponseData>(
        signUpUrl,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
        // {
        //   observe: "response",
        //   headers: headers
        // }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => this.handleAuthentication(resData))
      );
  }

  public login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError), tap(resData => this.handleAuthentication(resData)));
  }

  public logout() {
    this.loggedIn = false;
  }

  private handleError(errorRes: HttpErrorResponse) {
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
    }
    return throwError(error);
  }

  private handleAuthentication(resData: AuthResponseData) {
    let expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    let user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );

    this.user = user;
    this.userSub.next(user);
  }
}
