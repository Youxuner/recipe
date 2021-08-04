import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() public recipe?: Recipe;
  constructor(private service: RecipeService) {
  }

  ngOnInit(): void {
  }

  public toShoppingList() {
    if (this.recipe) {
      this.service.ingsToShoppingList(this.recipe.getIngredients());
    }
  }

}
