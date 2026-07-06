import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { authGuard } from '../../Guards/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { recipesResolver } from '../../Resolvers/recipes.resolver';

export const RECIPES_ROUTES: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [recipesResolver] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [recipesResolver] },
    ],
  },
];
