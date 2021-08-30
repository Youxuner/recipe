import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/shared/recipe.model';
import * as act from './recipe.actions';
import { State } from './state';

const initState: State = {
  recipes: [],
};

export function RecipeReducer(state = initState, action: act.RecActions) {
  let index: number, recipes: Recipe[];
  switch (action.type) {
    case act.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case act.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case act.UPDATE_RECIPE:
      index = state.recipes.findIndex((rec) => rec.id == action.payload.id);
      recipes = [...state.recipes];
      recipes[index] = action.payload;
      return {
        ...state,
        recipes: recipes,
      };
    case act.DELETE_RECIPE:
      index = state.recipes.indexOf(action.payload);
      if (index == -1) return state;
      recipes = [...state.recipes];
      recipes.splice(index, 1);
      return {
        ...state,
        recipes: recipes,
      }
    default:
      return state;
  }
}
