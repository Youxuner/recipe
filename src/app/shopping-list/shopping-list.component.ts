import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { AppState } from '../store/app-state';
import { StartEdit } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // public ingredients: Ingredient[] = [];
  // private subId = new Subscription();
  public ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.service.getIngredients();
    // this.subId = this.service.updatedSub.subscribe(
    //   (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    // );
  }

  ngOnDestroy(): void {
    // this.subId.unsubscribe();
  }

  public editIngredient(i: number) {
    // this.service.editSub.next(i);
    this.store.dispatch(new StartEdit(i));
  }
}
