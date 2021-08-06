import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  public recipe?: Recipe;
  constructor(private route: ActivatedRoute, private service: RecipeService) {

  }

  ngOnInit(): void {
    // this.route.params.subscribe(params => this.recipe = this.service.getRecipe(+params["id"]));
    this.route.data.subscribe((data: Data) => this.recipe = data["recipe"]);
  }

  public toShoppingList() {
    if (this.recipe) {
      this.service.ingsToShoppingList(this.recipe.getIngredients());
    }
  }

}
