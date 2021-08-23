import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  public recipe: Recipe;
  public showDone = false;
  constructor(private route: ActivatedRoute, private router: Router, private service: RecipeService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.recipe = this.service.getRecipe(+params["id"]));
    // this.route.data.subscribe((data: Data) => this.recipe = data["recipe"]);
    if (!this.recipe)
      this.router.navigate([".."], {relativeTo: this.route});
  }

  public toShoppingList() {
    this.service.ingsToShoppingList(this.recipe.ingredients);
    this.toShowDone();
  }

  public deleteRecipe() {
    this.service.deleteRecipe(this.recipe);
    this.service.updated.next();
    this.router.navigate([".."], {relativeTo: this.route});
  }

  public toShowDone() {
    this.showDone = true;

    setTimeout(() => {
      this.showDone = false;
    }, 1500);
  }

}
