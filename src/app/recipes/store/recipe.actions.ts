import { Action } from "@ngrx/store";
import { Recipe } from "src/app/shared/recipe.model";

export const SET_RECIPES = "[Recipes] Set Recipes";
export const FETCH_RECIPES = "[Recipes] Fetch Recipes";

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type: string = FETCH_RECIPES;
  public payload: any;

  constructor() {}
}


export type RecActions = SetRecipes | FetchRecipes;
