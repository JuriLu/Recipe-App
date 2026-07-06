import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'recipes',
    loadChildren: () => import('./Components/recipes/recipes.routes').then((m) => m.RECIPES_ROUTES),
  },
  {
    path: 'shopping-list',
    loadComponent: () => import('./Components/shopping-list/shopping-list.component').then((m) => m.ShoppingListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('./Components/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
];
