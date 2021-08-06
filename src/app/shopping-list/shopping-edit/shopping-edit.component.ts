import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/services/can-deactivate-guard.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, CanComponentDeactivate {

  @ViewChild("nameInput") nameElem: ElementRef = new ElementRef(HTMLInputElement);
  @ViewChild("amountInput") amountElem: ElementRef = new ElementRef(HTMLInputElement);

  constructor(private service: ShoppingListService) { }

  ngOnInit(): void {
  }

  public addIngredient(nameElem: HTMLInputElement, amountElem: HTMLInputElement) {
    let name = nameElem.value;
    let amount = Number(amountElem.value);
    // console.log(amount);
    if (amount <= 0)
    {
      console.error("amount <= 0");
      return;
    }

    let ingredient = new Ingredient(name, amount);
    this.service.addIngredient(ingredient);
  }

  public deleteIngredient() {
    let ing = new Ingredient(this.nameElem.nativeElement.value, this.amountElem.nativeElement.value);
    this.service.deleteIngredient(ing);
  }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    let amount: number = this.amountElem.nativeElement.value;
    let name = this.nameElem.nativeElement.value;

    if (amount <= 0) return true;
    if (!name) return true;
    return confirm("Do you want to discard the info in form?");
  };
}
