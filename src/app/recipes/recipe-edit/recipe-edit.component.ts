import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  public editMode = false;
  private id: number;
  public recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private service: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = (this.id >= 0);
      // console.log(this.editMode);
      this.initForm();
    })
  }

  private initForm() {
    let name = "";
    let imagePath = "";
    let description = "";
    let ingredients: FormGroup[] = [];
    if (this.editMode)
    {
      let recipe = this.service.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      for (let ing of recipe.ingredients) {
        ingredients.push(
          new FormGroup({
            "name": new FormControl(ing.name, Validators.required),
            "amount": new FormControl(ing.amount, [Validators.required, Validators.min(1)])
          })
        )
      }
    }
    else {
      ingredients.push(
        new FormGroup({
          "name": new FormControl(null, Validators.required),
          "amount": new FormControl(null, [Validators.required, Validators.min(1)])
        })
      );
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(name, Validators.required),
      "imagePath": new FormControl(imagePath, Validators.required),
      "description": new FormControl(description, Validators.required),
      "ingredients": new FormArray(ingredients),
    });
  }

  public getGroup() {
    let formArray = this.recipeForm.get("ingredients") as FormArray;
    return formArray.controls;
  }

  public addIngredient() {
    let formArray = this.recipeForm.get("ingredients") as FormArray;
    formArray.push(new FormGroup({
      "name": new FormControl(null, Validators.required),
      "amount": new FormControl(null, [Validators.required, Validators.min(1)])
    }));
  }

  public onSubmit() {
    // console.log(this.recipeForm.value);
    let id = this.service.getNewId();
    let name = this.recipeForm.value.name;
    let imagePath = this.recipeForm.value.imagePath;
    let description = this.recipeForm.value.description;
    let ingredients = this.recipeForm.value.ingredients;

    if (this.editMode) {
      let recipe = new Recipe(this.id, name, description, imagePath, ingredients);
      this.service.updateRecipe(recipe);
    }
    else {
      let recipe = new Recipe(id, name, description, imagePath, ingredients);
      this.service.addRecipe(recipe);
    }

    this.service.updated.next();
    this.router.navigate([".."], {relativeTo: this.route});

  }

  public cancelEdit() {
    this.router.navigate([".."], {relativeTo: this.route})
  }

  public deleteIngredient(i: number) {
    let formArray = this.recipeForm.get("ingredients") as FormArray;
    formArray.removeAt(i);
  }

}
