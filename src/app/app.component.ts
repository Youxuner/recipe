import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as act from './auth/store/auth.actions';
import { AppState } from './store/app-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.store.dispatch(new act.AutoLogin());
  }
}
