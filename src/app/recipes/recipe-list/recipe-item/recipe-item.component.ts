import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() public recipe?: Recipe;
  constructor(private service: RecipeService) { }

  ngOnInit(): void {
  }

  public selectRecipe() {
    this.service.selectEv.emit(this.recipe);
  }
}
