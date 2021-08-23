import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [];
  public updatedSub = new Subject<Ingredient[]>();
  public editSub = new Subject<number>();
  constructor() {
    this.ingredients = [
      new Ingredient("Apples", 5),
      new Ingredient("Tomatoes", 10),

    ];
  }

  public getIngredients() {
    return this.ingredients.slice();
  }

  public getIngredient(index: number) {
    return this.ingredients[index];
  }

  private _addIngredient(ing: Ingredient) {
    let index = this.ingredients.findIndex(ingredient => ingredient.name == ing.name);
    if (index == -1)
      this.ingredients.push(ing);
    else
      this.ingredients[index].amount += ing.amount;
  }

  // in seguito ci sono delle funzioni wrapper, alcune funzioni chiama più volte la funzione add,
  // quindi wrapper è creato per evitare di emettere troppi eventi inutili.
  public ingsToShoppingList(ings: Ingredient[]) {
    for (let ing of ings)
      this._addIngredient(ing);

      this.updatedSub.next(this.ingredients);
  }

  public addIngredient(ing: Ingredient) {
    this._addIngredient(ing);
    this.updatedSub.next(this.ingredients);
  }

  public updateIngredient(index: number, ing: Ingredient) {
    this._updateIngredient(index, ing);
    this.updatedSub.next(this.ingredients);
  }

  public _updateIngredient(index: number, ing: Ingredient) {
    this.ingredients[index] = ing;
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
    this.updatedSub.next(this.ingredients);
  }

}
