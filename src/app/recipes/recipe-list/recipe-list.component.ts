import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../services/recipe.service';

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
    this.service.fetchRecipes().subscribe((recipes: Recipe[]) => this.recipes = recipes);
    this.subId = this.service.updated.subscribe(() => {
      this.recipes = this.service.getRecipes();
    })
  }

  ngOnDestroy(): void {
    this.subId.unsubscribe();
  }

}
