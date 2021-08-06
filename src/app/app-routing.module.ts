import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AuthGuard } from './services/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { RecipeResolver } from './services/resolver.service';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "recipes",
    pathMatch: "full",
  },
  {
    path: "recipes",
    // pathMatch: "full",
    component: RecipesComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
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
          pathMatch: "full",
          component: RecipeDetailComponent,
          resolve: {
            recipe: RecipeResolver
          }
        },
        {
          path: ":id/edit",
          pathMatch: "full",
          component: RecipeEditComponent
        },
      ]
  },
  {
    path: "shopping-list",
    // pathMatch: "full",             se ha children, non mettere questo.
    component: ShoppingListComponent,
    // canActivate: [AuthGuard],
      children: [
        {
          path: "",
          pathMatch: "full",
          component: ShoppingEditComponent,
          canDeactivate: [CanDeactivateGuard],
        }
      ]
  },
  // {
  //   path: "not-found",
  //   pathMatch: "full",
  //   component: PageNotFoundComponent
  // },
  {
    path: "not-found",
    pathMatch: "full",
    component: ErrorPageComponent,
    data: {
      message: "Page not found!"
    }
  },
  {
    path: "**",
    redirectTo: "/not-found",
    pathMatch: "full"
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {useHash: true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
