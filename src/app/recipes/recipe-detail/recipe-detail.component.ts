import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;
  public showDone = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => +params.id),
        switchMap((id: number) =>
          this.store.select('recipe').pipe(
            map((state) => {
              return state.recipes.find((recipe) => recipe.id === id);
            })
          )
        )
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
        if (!this.recipe)
          this.router.navigate(['..'], { relativeTo: this.route });
      });
    // this.route.params.subscribe((params) =>
    //   this.store
    //     .select('recipe')
    //     .pipe(
    //       map((state) => {
    //         let id = +params.id;
    //         return state.recipes.find((recipe) => recipe.id === id);
    //       })
    //     )
    //     .subscribe((recipe) => {
    //       this.recipe = recipe;
    //       if (!this.recipe)
    //         this.router.navigate(['..'], { relativeTo: this.route });
    //     })
    // );
  }

  public toShoppingList() {
    this.service.ingsToShoppingList(this.recipe.ingredients);
    this.toShowDone();
  }

  public deleteRecipe() {
    this.service.deleteRecipe(this.recipe);
    this.service.updated.next();
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  public toShowDone() {
    this.showDone = true;

    setTimeout(() => {
      this.showDone = false;
    }, 1500);
  }
}
