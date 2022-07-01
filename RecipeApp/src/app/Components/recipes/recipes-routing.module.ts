import {NgModule} from '@angular/core';
import {AuthGuard} from "../../Guards/auth.guard";
import {RecipesResolver} from "../../Resolvers/recipes.resolver";
import {RecipesComponent} from "./recipes.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolver]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolver]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {
}
