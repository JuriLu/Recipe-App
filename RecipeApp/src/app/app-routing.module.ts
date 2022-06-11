import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipesResolver} from "./Resolvers/recipes.resolver";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./Guards/auth.guard";

const appRoutes:Routes = [
  {path:'' , redirectTo:'auth',pathMatch:'full'},
  {
    path:'recipes',
    component:RecipesComponent,
    canActivate: [AuthGuard],
    children:[
      {path:'',component:RecipeStartComponent},
      {path:'new',component:RecipeEditComponent},
      {path:':id',component:RecipeDetailComponent,resolve:[RecipesResolver]},
      {path:':id/edit',component:RecipeEditComponent,resolve:[RecipesResolver]},
    ]},
  {
    path:'shopping-list',
    component:ShoppingListComponent,
    canActivate: [AuthGuard]
  },
  {path:'auth' , component:AuthComponent}
]


@NgModule({
  imports : [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})


export class AppRoutingModule {
}
