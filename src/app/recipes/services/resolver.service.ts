import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Recipe } from "src/app/shared/recipe.model";
import { AppState } from "src/app/store/app-state";
import { FetchRecipes, SET_RECIPES } from "../store/recipe.actions";

@Injectable({
  providedIn: "root"
})
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(private store: Store<AppState>, private actions: Actions) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

    this.store.dispatch(new FetchRecipes());
    return this.actions.pipe(ofType(SET_RECIPES), take(1));
  }

}
