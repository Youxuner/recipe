import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createEffects } from '@ngrx/effects/src/effects_module';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from 'src/app/shared/recipe.model';
import { AppState } from 'src/app/store/app-state';
import * as act from './recipe.actions';

const baseUrl =
  'https://my-first-backend-ae87c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() =>
    this.actions.pipe(
      ofType(act.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(baseUrl);
      }),
      map((recipes: Recipe[]) => {
        recipes.map(
          (recipe: Recipe) =>
            (recipe = {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            })
        );

        return new act.SetRecipes(recipes);
      })
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions.pipe(
        ofType(act.STORE_RECIPES),
        withLatestFrom(this.store.select('recipe')),
        switchMap(([actData, recState]) => {
          return this.http.put(baseUrl, recState.recipes);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
}
