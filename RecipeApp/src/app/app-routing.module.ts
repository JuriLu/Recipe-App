import {NgModule} from "@angular/core";
import {AuthGuard} from "./Guards/auth.guard";
import {RouterModule, Routes} from "@angular/router";

import {AuthComponent} from "./auth/auth.component";
import {ShoppingListComponent} from "./Components/shopping-list/shopping-list.component";

const appRoutes:Routes = [
  {path:'' , redirectTo:'auth',pathMatch:'full'},
]


@NgModule({
  imports : [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})


export class AppRoutingModule {
}
