import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as act from '../store/auth.actions';

@Injectable()
export class AuthService {
  private logoutTimer: any;
  constructor(
    private store: Store<AppState>
  ) {}

  public setLogoutTimer(timeout: number) {
    this.logoutTimer = setTimeout(() => {
      this.store.dispatch(new act.Logout());
    }, timeout);
  }

  public clearLogoutTimer() {
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
    this.logoutTimer = null;
  }
}
