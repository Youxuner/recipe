import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as authAct from '../auth/store/auth.actions';
// import { RecipeService } from '../recipes/services/recipe.service';
import * as recAct from '../recipes/store/recipe.actions';

import { AppState } from '../store/app-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public collapsed: boolean = true;
  public active = 1;
  public isAuthenticated = false;
  public email: string = null;
  private uerSubId = new Subscription();
  constructor(
    // private service: RecipeService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {

    this.uerSubId = this.store.select("auth").subscribe(state => {
      this.isAuthenticated = !!state.user;
      this.email = state.user?state.user.email:null;
    })
  }

  ngOnDestroy(): void {
    this.uerSubId.unsubscribe();
  }

  public logout() {
    this.store.dispatch(new authAct.Logout());
  }

  public saveData() {
    this.store.dispatch(new recAct.StoreRecipes());
  }

  public fetchData() {
    this.store.dispatch(new recAct.FetchRecipes());
  }
}
