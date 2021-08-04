import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [];
  @Output() public updatedEv = new EventEmitter();
  constructor() {
    this.ingredients = [
      new Ingredient("Apples", 5),
      new Ingredient("Tomatoes", 10),

    ];
  }

  public getIngredients() {
    return this.ingredients.slice();
  }

  private _addIngredient(ing: Ingredient){
    let index = this.ingredients.findIndex(ingredient => ingredient.name == ing.name);
    if (index == -1)
      this.ingredients.push(ing);
    else
      this.ingredients[index].amount += ing.amount;
  }

  // funzione wrapper, alcune funzioni chiama più volte la funzione add,
  // quindi wrapper è creato per evitare di emettere troppi eventi inutili.
  public addIngredient(ing: Ingredient){
    this._addIngredient(ing);
    this.updatedEv.emit();
  }

  private _deleteIngredient(ing: Ingredient){
    let index = this.ingredients.findIndex(ingredient => ingredient.name == ing.name);
    if (index == -1) return;

    this.ingredients[index].amount -= ing.amount;
    if (this.ingredients[index].amount <= 0)
      this.ingredients.splice(index, 1);
  }

  // funzione wrapper
  public deleteIngredient(ing: Ingredient){
    this._deleteIngredient(ing);
    this.updatedEv.emit();
  }

  public ingsToShoppingList(ings: Ingredient[]) {
    for (let ing of ings)
      this._addIngredient(ing);

    this.updatedEv.emit();
  }
}
