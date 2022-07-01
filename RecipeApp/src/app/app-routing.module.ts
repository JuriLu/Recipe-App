import {NgModule} from "@angular/core";
import {AuthGuard} from "./Guards/auth.guard";
import {RouterModule, Routes} from "@angular/router";

import {AuthComponent} from "./auth/auth.component";
import {ShoppingListComponent} from "./Components/shopping-list/shopping-list.component";

const appRoutes:Routes = [
  {path:'' , redirectTo:'auth',pathMatch:'full'},

  {path:'auth' , component:AuthComponent}
]


@NgModule({
  imports : [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})


export class AppRoutingModule {
}
