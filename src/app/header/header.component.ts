import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { RecipeService } from '../recipes/services/recipe.service';
import { Recipe } from '../shared/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public collapsed: boolean = true;
  public active = 1;
  public isAuthenticated = false;
  public email: string = '';
  private uerSubId = new Subscription();
  constructor(
    private router: Router,
    private authService: AuthService,
    private service: RecipeService
  ) {}

  ngOnInit(): void {
    this.uerSubId = this.authService.userSub.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.email = user?user.email:"";
    });
  }

  ngOnDestroy(): void {
    this.uerSubId.unsubscribe();
  }

  public logout() {
    this.authService.logout();
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
