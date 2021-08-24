import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Recipe } from 'src/app/shared/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';
import { AppState } from 'src/app/shopping-list/store/state';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // @Output() public selectEv = new EventEmitter<Recipe>();
  private baseUrl =
    'https://my-first-backend-ae87c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  private recipes: Recipe[];
  private nextId: number;
  public updated = new Subject();
  constructor(
    private store: Store<AppState>,
    private http: HttpClient
  ) {}

  // Get
  public fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get(this.baseUrl, {
        headers: new HttpHeaders({ 'Custom-Message': 'Hello' }),
      })
      .pipe(
        map((response) => {
          let recipes: Recipe[] = [];
          for (let key in response) {
            let recipe: Recipe = response[key];
            recipe = {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
            recipes.push(recipe);
          }
          return recipes;
        }),
        tap((recipes: Recipe[]) => {
          this.setRecipes(recipes);
          this.nextId = recipes.length;
        })
      );
  }

  public getRecipes() {
    return this.recipes;
  }

  public setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updated.next();
  }
  // Get ?
  public getRecipe(id: number) {
    return this.recipes.find((recipe: Recipe) => recipe.id === id);
  }

  // Post ?
  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    // return this.http.post(this.baseUrl, recipe, {
    //   observe: "response"
    // });
  }

  // Put ?
  public updateRecipe(recipe: Recipe) {
    let index = this.recipes.findIndex((rec) => rec.id == recipe.id);
    this.recipes[index] = recipe;
    // let url = this.baseUrl + "/" + index;
    // return this.http.put(url, recipe);
  }

  // Put
  public storeRecipes(): Observable<any> {
    return this.http.put(this.baseUrl, this.recipes);
  }

  // Delete ?
  public deleteRecipe(recipe: Recipe) {
    let index = this.recipes.indexOf(recipe);
    this.recipes.splice(index, 1);
    // let url = this.baseUrl + "/" + index;
    // return this.http.delete(url);
  }

  public getNewId() {
    let id = this.nextId;
    this.nextId++;
    return id;
  }

  public ingsToShoppingList(ings: Ingredient[]) {
    // return this.slService.ingsToShoppingList(ings);
    this.store.dispatch(new AddIngredients(ings));
  }
}
