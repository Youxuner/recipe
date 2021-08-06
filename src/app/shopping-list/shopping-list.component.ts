import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  public ingredients: Ingredient[] = [];
  constructor(private service: ShoppingListService, private router: Router) {
    this.ingredients = this.service.getIngredients();
  }

  ngOnInit(): void {
    this.service.updatedEv.subscribe(() => this.ingredients = this.service.getIngredients());
  }
}
