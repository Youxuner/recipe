import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "recipes",
    pathMatch: "full",
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
