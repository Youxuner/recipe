import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  public recipes: Observable<{ recipes: Recipe[] }>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.recipes = this.store.select("recipe");
  }

  ngOnDestroy(): void {
  }

}
