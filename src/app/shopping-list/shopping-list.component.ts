import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  public ingredients: Ingredient[] = [];
  constructor(private service: ShoppingListService) {
    this.ingredients = this.service.getIngredients();
  }

  ngOnInit(): void {
    this.service.updatedEv.subscribe(() => this.ingredients = this.service.getIngredients());
  }

}
