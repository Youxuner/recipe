import { Ingredient } from '../../shared/ingredient.model';
import * as act from './shopping-list.actions';
import { State } from './state';

const initState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editIng: null,
  editIngIndex: -1,
};

export function shoppingListReducer(state = initState, action: act.IngActions) {
  let ing: Ingredient, index: number, amount: number, ings: Ingredient[];
  switch (action.type) {
    case act.ADD_INGREDIENT:
      ings = state.ingredients.slice();
      index = ings.findIndex(
        (ingredient) => ingredient.name == action.payload.name
      );
      if (index == -1) ings.push(action.payload);
      else {
        ing = ings[index];
        amount = ing.amount + action.payload.amount;
        ings[index] = { ...ing, amount: amount };
      }
      return {
        ...state,
        ingredients: ings,
      };
    case act.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case act.UPDATE_INGREDIENT:
      ing = state.ingredients[state.editIngIndex];
      let newIng = { ...ing, ...action.payload };
      ings = [...state.ingredients];
      ings[state.editIngIndex] = newIng;
      return {
        ...state,
        ingredients: ings,
        editIng: null,
        editIngIndex: -1,
      };
    case act.DELETE_INGREDIENT:
      ing = action.payload;
      index = state.ingredients.findIndex(
        (ingredient) => ingredient.name == ing.name
      );
      if (index == -1) return state;

      amount = state.ingredients[index].amount - ing.amount;
      ings = [...state.ingredients];
      if (amount <= 0) ings.splice(index, 1);
      else ings[index] = { ...ing, amount: amount };
      return {
        ...state,
        ingredients: ings,
        editIng: null,
        editIngIndex: -1,
      };
    case act.START_EDIT:
      return {
        ...state,
        editIngIndex: action.payload,
        editIng: { ...state.ingredients[action.payload] },
      };
    case act.STOP_EDIT:
      return {
        ...state,
        editIng: null,
        editIngIndex: -1,
      };
    default:
      return state;
  }
}
