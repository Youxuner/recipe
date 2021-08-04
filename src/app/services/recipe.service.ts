import { EventEmitter, Injectable, Output } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  @Output() public selectEv = new EventEmitter<Recipe>();
  private recipes: Recipe[];
  constructor(private slService: ShoppingListService) {
    this.recipes = [
      new Recipe(
        "Tasty Schnitzel",
        "This is a super-tasty Schnitzel - just awesome!",
        "https://upload.wikimedia.org/wikipedia/commons/b/bc/Wiener_Schnitzel_2012.jpg",
        [
          new Ingredient("Meat", 1),
          new Ingredient("French Fries", 20),
        ]
      ),
      new Recipe(
        "Big Fat Burger",
        "What else you need to say?",
        "https://i1.wp.com/www.thegiornale.it/wp-content/uploads/2019/04/hamburger-torino.jpg?resize=704%2C396&ssl=1",
        [
          new Ingredient("Buns", 2),
          new Ingredient("Meat", 1),
        ]
      )
    ];
  }

  public getRecipes() {
    return this.recipes.slice();
  }

  public ingsToShoppingList(ings: Ingredient[]) {
    return this.slService.ingsToShoppingList(ings);
  }
}
