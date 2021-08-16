import { EventEmitter, Injectable, Output } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // @Output() public selectEv = new EventEmitter<Recipe>();
  private baseUrl = "https://my-first-backend-ae87c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";
  private recipes: Recipe[];
  private nextId: number;
  public updated = new Subject<Recipe[]>();
  constructor(private slService: ShoppingListService, private http: HttpClient) {
    this.getRecipes().subscribe((recipes => this.recipes = recipes));
  }

  public getRecipes(): Observable<Recipe[]> {
    // this.recipes = [];
    return this.http.get(this.baseUrl).pipe(map(response => {
      let recipes: Recipe[] = [];
      for (let key in response) {
        recipes.push(response[key]);
      }
      return recipes;
    }));
  }

  public getRecipe(id: number) {
    return this.recipes.find((recipe: Recipe) => recipe.id === id);
  }

  // TODO
  public updateRecipe(recipe: Recipe) {
    let index = this.recipes.findIndex(rec => rec.id == recipe.id);
    this.recipes[index] = recipe;

    this.updated.next(this.recipes.slice());
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.http.post(this.baseUrl, recipe)
    .subscribe();

    this.updated.next(this.recipes.slice());
  }

  public getNewId() {
    let id = this.nextId;
    this.nextId++;
    return id;
  }

  public ingsToShoppingList(ings: Ingredient[]) {
    return this.slService.ingsToShoppingList(ings);
  }

  // TODO
  public deleteRecipe(recipe: Recipe) {
    let index = this.recipes.indexOf(recipe);
    this.recipes.splice(index, 1);

    this.updated.next(this.recipes.slice());
  }
}
