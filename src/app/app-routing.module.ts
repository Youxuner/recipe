import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/recipes",
    pathMatch: "full",
  },
  {
    path: "recipes",
    loadChildren: () => import("./recipes/recipes.module").then(m => m.RecipesModule),
  },
  {
    path: "shopping-list",
    loadChildren: () => import("./shopping-list/shopping-list.module").then(m => m.ShoppingListModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
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
  // {
  //   path: "**",
  //   redirectTo: "/not-found",
  //   pathMatch: "full"
  // },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {useHash: true})],
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
