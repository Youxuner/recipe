import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as shoAct from 'src/app/shopping-list/store/shopping-list.actions';
import { AppState } from 'src/app/store/app-state';
import { Recipe } from '../../shared/recipe.model';
import * as recAct from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  public showDone = false;
  private storeSub = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.route.params
      .pipe(
        map((params) => +params.id),
        switchMap((id: number) =>
          this.store.select('recipe').pipe(
            map((state) => {
              return state.recipes.find((recipe) => recipe.id === id);
            })
          )
        )
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
        if (!this.recipe)
          this.router.navigate(['..'], { relativeTo: this.route });
      });
    // this.route.params.subscribe((params) =>
    //   this.store
    //     .select('recipe')
    //     .pipe(
    //       map((state) => {
    //         let id = +params.id;
    //         return state.recipes.find((recipe) => recipe.id === id);
    //       })
    //     )
    //     .subscribe((recipe) => {
    //       this.recipe = recipe;
    //       if (!this.recipe)
    //         this.router.navigate(['..'], { relativeTo: this.route });
    //     })
    // );
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  public toShoppingList() {
    // this.service.ingsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new shoAct.AddIngredients(this.recipe.ingredients));
    this.toShowDone();
  }

  public deleteRecipe() {
    this.store.dispatch(new recAct.DeleteRecipe(this.recipe));
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  public toShowDone() {
    this.showDone = true;

    setTimeout(() => {
      this.showDone = false;
    }, 1500);
  }
}
