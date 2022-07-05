import {NgModule} from "@angular/core";
import {AuthGuard} from "./Guards/auth.guard";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

import {AuthComponent} from "./auth/auth.component";
import {ShoppingListComponent} from "./Components/shopping-list/shopping-list.component";

const appRoutes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'recipes', loadChildren: () => import('./Components/recipes/recipes.module').then(m => m.RecipesModule)},
  {path: 'shopping-list', loadChildren: () => import('./Components/shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules })],  //best of both worlds  small size of main.ts but fast loading as they all preload
  exports: [RouterModule]
})


export class AppRoutingModule {
}
