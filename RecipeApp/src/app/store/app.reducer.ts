import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../Components/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../Components/recipes/store/recipes.reducer';

export interface AppState {
  shoppingList: fromShoppingList.SLState;
  auth: fromAuth.AUState;
  recipes: fromRecipes.RecipesState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipesReducer,
};
