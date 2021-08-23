import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/services/auth-guard.service";
import { RecipeResolver } from "./services/resolver.service";

const routes: Routes = [
  {
    path: "recipes",
    // pathMatch: "full",
    component: RecipesComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
      children: [
        {
          path: "",
          pathMatch: "full",
          component: RecipeStartComponent
        },
        {
          path: "new",
          pathMatch: "full",
          component: RecipeEditComponent
        },
        {
          path: ":id",
          component: RecipeDetailComponent,
          resolve: [RecipeResolver]
        },
        {
          path: ":id/edit",
          pathMatch: "full",
          component: RecipeEditComponent,
          resolve: [RecipeResolver]
        },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
