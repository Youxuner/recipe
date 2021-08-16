import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  public recipes: Recipe[] = [];
  private subId: Subscription;
  constructor(private service: RecipeService) { }

  ngOnInit(): void {
    this.service.getRecipes().subscribe((recipes: Recipe[]) => this.recipes = recipes);
    this.subId = this.service.updated.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
  }

  ngOnDestroy(): void {
    this.subId.unsubscribe();
  }

}
