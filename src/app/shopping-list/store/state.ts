import { Ingredient } from "src/app/shared/ingredient.model";

export interface State {
  ingredients: Ingredient[],
  editIng?: Ingredient,
  editIngIndex?: number,
}

export interface AppState {
  shoppingList: State,
}
