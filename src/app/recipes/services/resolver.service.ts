import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "src/app/shared/recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root"
})
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(private recipeService: RecipeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

      let recipes = this.recipeService.getRecipes();
      // console.log("in resolver: ", recipes);
      return recipes ? recipes : this.recipeService.fetchRecipes();
  }

}
