import * as fromAuth from "../auth/store/state";
import * as fromShopping from "../shopping-list/store/state";

export interface AppState {
  shoppingList: fromShopping.State,
  auth: fromAuth.State,
}
