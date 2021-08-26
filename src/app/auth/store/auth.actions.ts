import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/user.model';

export const SIGNUP_START = '[Auth] Signup Start';
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

export class SignupStart implements Action {
  readonly type: string = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type: string = AUTHENTICATE_SUCCESS;

  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
  public payload: any;

  constructor() {}
}

export class AuthenticateFail implements Action {
  readonly type: string = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export class AutoLogin implements Action {
  readonly type: string = AUTO_LOGIN;
  public payload: any;
  constructor() {}
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | SignupStart
  | AuthenticateFail
  | AutoLogin;
