import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable()
export class AuthService {
  private loggedIn: boolean = false;
  constructor(private http: HttpClient) {}

  public isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });

    return promise;
  }

  public signup(email: string, password: string) {

    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200/' });

    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCM9-CVyBXo0PXIUh5U50uOyxhXKJHCq5Q',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }, {headers: headers}
    );
  }

  public login() {
    this.loggedIn = true;
  }

  public logout() {
    this.loggedIn = false;
  }
}
