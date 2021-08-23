import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  public ingredients: Ingredient[] = [];
  private subId = new Subscription();
  constructor(private service: ShoppingListService, private router: Router) {

  }

  ngOnInit(): void {
    this.ingredients = this.service.getIngredients();
    this.subId = this.service.updatedSub.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  ngOnDestroy(): void {
    this.subId.unsubscribe();
  }

  public editIngredient(i: number) {
    this.service.editSub.next(i);
  }
}
