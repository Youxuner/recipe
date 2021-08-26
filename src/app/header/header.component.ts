import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as act from '../auth/store/auth.actions';
import { RecipeService } from '../recipes/services/recipe.service';
import { Recipe } from '../shared/recipe.model';
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
    private service: RecipeService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.uerSubId = this.authService.userSub.subscribe((user) => {
    //   this.isAuthenticated = !!user;
    //   this.email = user?user.email:null;
    // });

    this.uerSubId = this.store.select("auth").subscribe(state => {
      this.isAuthenticated = !!state.user;
      this.email = state.user?state.user.email:null;
    })
  }

  ngOnDestroy(): void {
    this.uerSubId.unsubscribe();
  }

  public logout() {
    // this.authService.logout();
    this.store.dispatch(new act.Logout());
  }

  public saveData() {
    this.service.storeRecipes().subscribe();
  }

  public fetchData() {
    this.service
      .fetchRecipes()
      .subscribe((recipes: Recipe[]) => this.service.setRecipes(recipes));
  }
}
