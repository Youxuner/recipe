import { EventEmitter, Injectable, Output } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

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
    private slService: ShoppingListService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Get
  public fetchRecipes(): Observable<Recipe[]> {
    return this.authService.userSub.pipe(
      take(1),
      exhaustMap((user) =>
        this.http.get(this.baseUrl, {
          headers: new HttpHeaders({ 'Custom-Message': 'Hello' }),
          params: new HttpParams().set('print', 'pretty').set("auth", user.token),
        })
      ),
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
    return this.slService.ingsToShoppingList(ings);
  }
}
