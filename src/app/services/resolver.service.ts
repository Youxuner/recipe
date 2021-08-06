import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../shared/recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root"
})
export class RecipeResolver implements Resolve<Recipe> {
  constructor(private recipeService: RecipeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Recipe | Observable<Recipe> | Promise<Recipe> {
    let recipe = this.recipeService.getRecipe(+route.params["id"]);

    return recipe?recipe:{} as Recipe;
  }

}
