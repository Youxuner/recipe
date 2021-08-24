import {
  Component,
  // ElementRef,
  // EventEmitter,
  // Output,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/services/can-deactivate-guard.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { AddIngredient, DeleteIngredient, StopEdit, UpdateIngredient } from '../store/shopping-list.actions';
import { AppState } from '../store/state';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  // @ViewChild("nameInput") nameElem: ElementRef = new ElementRef(HTMLInputElement);
  // @ViewChild("amountInput") amountElem: ElementRef = new ElementRef(HTMLInputElement);
  private index: number;
  private ingredient: Ingredient;
  private subId: Subscription;
  public editMode = false;
  @ViewChild('f') form: NgForm;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.subId = this.service.editSub.subscribe((i) => {
    //   this.editMode = true;
    //   this.index = i;
    //   // this.ingredient = this.service.getIngredient(i);
    //   this.store.select("shoppingList").pipe(take(1), map(obj => obj.ingredients)).subscribe(ings => this.ingredient = ings[i]);
    //   this.form.setValue(this.ingredient);
    // });
    this.subId = this.store.select("shoppingList").subscribe(state => {
      if (state.editIngIndex <= -1)
        return;

      this.editMode = true;
      this.index = state.editIngIndex;
      this.ingredient = state.editIng;
      this.form.setValue(this.ingredient);
    })
  }

  ngOnDestroy(): void {
    this.subId.unsubscribe();
    this.store.dispatch(new StopEdit());
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
      this.store.dispatch(new UpdateIngredient(ingredient))
      // this.service.updateIngredient(this.index, ingredient);
    // else this.service.addIngredient(ingredient);
    else {
      this.store.dispatch(new AddIngredient(ingredient));

    }

    this.reset();
  }

  public deleteIngredient() {
    let ing = new Ingredient(this.form.value.name, this.form.value.amount);
    // this.service.deleteIngredient(ing);
    this.store.dispatch(new DeleteIngredient(ing));
    this.reset();
  }

  public reset() {
    this.editMode = false;
    this.form.reset();
    this.store.dispatch(new StopEdit());
  }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.form.value.name) return true;
    if (!this.form.value.amount) return true;
    let response = confirm('Do you want to discard the info in form?');
    if (response) this.form.reset();
    return response;
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
