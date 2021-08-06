import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  private loggedIn: boolean = false;
  constructor() {}

  public isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );

    return promise;
  }

  public login() {
    this.loggedIn = true;
  }

  public logout() {
    this.loggedIn = false;
  }
}
