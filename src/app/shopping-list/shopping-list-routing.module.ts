import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard } from "../services/can-deactivate-guard.service";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

const routes: Routes = [
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
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}
