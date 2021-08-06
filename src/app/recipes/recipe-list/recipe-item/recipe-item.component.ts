import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() public recipe: Recipe = {} as Recipe;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // public selectRecipe() {
  //   // this.service.selectEv.emit(this.recipe);
  //   this.router.navigate(["/recipes", this.recipe.getId()]);
  // }
}
