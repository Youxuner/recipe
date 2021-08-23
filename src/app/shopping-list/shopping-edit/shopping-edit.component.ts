import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/services/can-deactivate-guard.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  // @ViewChild("nameInput") nameElem: ElementRef = new ElementRef(HTMLInputElement);
  // @ViewChild("amountInput") amountElem: ElementRef = new ElementRef(HTMLInputElement);
  private index: number;
  private ingredient: Ingredient;
  private subId: Subscription;
  public editMode = false;
  @ViewChild("f") form: NgForm;

  constructor(private service: ShoppingListService) { }

  ngOnInit(): void {
    this.subId = this.service.editSub.subscribe((i) => {
      this.editMode = true;
      this.index = i;
      this.ingredient = this.service.getIngredient(i);
      this.form.setValue(this.ingredient);
    })
  }

  ngOnDestroy(): void {
    this.subId.unsubscribe();
  }

  public onSubmit() {
    let name = this.form.value.name;
    let amount = this.form.value.amount;
    // console.log(amount);
    // if (amount <= 0)
    // {
    //   console.error("amount <= 0");
    //   return;
    // }

    let ingredient = new Ingredient(name, amount);
    if (this.editMode)
      this.service.updateIngredient(this.index, ingredient);
    else
      this.service.addIngredient(ingredient);

    this.reset();
  }

  public deleteIngredient() {
    let ing = new Ingredient(this.form.value.name, this.form.value.amount);
    this.service.deleteIngredient(ing);
    this.reset();
  }

  public reset() {
    this.editMode = false;
    this.form.reset();
  }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.editMode) return true;
    return confirm("Do you want to discard the info in form?");
  }

  // public addIngredient(nameElem: HTMLInputElement, amountElem: HTMLInputElement) {
  //   let name = nameElem.value;
  //   let amount = Number(amountElem.value);
  //   // console.log(amount);
  //   if (amount <= 0)
  //   {
  //     console.error("amount <= 0");
  //     return;
  //   }

  //   let ingredient = new Ingredient(name, amount);
  //   this.service.addIngredient(ingredient);
  // }

  // public deleteIngredient() {
  //   let ing = new Ingredient(this.nameElem.nativeElement.value, this.amountElem.nativeElement.value);
  //   this.service.deleteIngredient(ing);
  // }


}