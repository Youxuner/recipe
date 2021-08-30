import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/shared/recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const STORE_RECIPES = '[Recipes] Store Recipe';

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type: string = FETCH_RECIPES;
  public payload: any;

  constructor() {}
}

export class AddRecipe implements Action {
  readonly type: string = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type: string = UPDATE_RECIPE;

  constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type: string = DELETE_RECIPE;

  constructor(public payload: Recipe) {}
}

export class StoreRecipes implements Action {
  readonly type: string = STORE_RECIPES;
  public payload: any;

  constructor() {}
}

export type RecActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes;
