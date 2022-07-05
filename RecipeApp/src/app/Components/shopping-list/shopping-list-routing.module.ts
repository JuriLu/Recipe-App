import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShoppingListComponent} from "./shopping-list.component";
import {AuthGuard} from "../../Guards/auth.guard";

const routes: Routes = [
  {
    path:'',
    component:ShoppingListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
