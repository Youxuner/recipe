import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  public recipe: Recipe = {} as Recipe;
  constructor(private service: RecipeService) {
    // this.service.selectEv.subscribe((recipe: Recipe) => this.recipe = recipe);
  }

  ngOnInit(): void {
  }

}
