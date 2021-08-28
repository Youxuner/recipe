import { Action } from "@ngrx/store";
import * as act from "./recipe.actions";
import { State } from "./state";

const initState: State = {
  recipes: [],
}

export function RecipeReducer(state = initState, action: act.RecActions) {
  switch (action.type) {
    case act.SET_RECIPES:
      return {
        ...state,
        recipes: [ ...action.payload ],
      };
    default:
      return state;
  }
}
