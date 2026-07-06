import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { RecipeModel } from '../Models/recipe.model';
import { IngredientModel } from '../Models/ingredient.model';
import * as ShoppingListActions from '../Components/shopping-list/store/shopping-list.actions';
import * as RecipeActions from '../Components/recipes/store/recipes.actions';
import * as fromAppReducer from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly store = inject(Store<fromAppReducer.AppState>);

  // Expose recipes as a Signal
  readonly recipes = this.store.selectSignal((state) => state.recipes.recipes);
  readonly loading = this.store.selectSignal((state) => state.recipes.loading);
  readonly error = this.store.selectSignal((state) => state.recipes.error);

  // Keep Subject for compatibility (though we should migrate views to use the signal directly)
  readonly recipesChanged = new Subject<RecipeModel[]>();

  constructor() {}

  fetchRecipes(): void {
    this.store.dispatch(RecipeActions.fetchRecipes());
  }

  getRecipes(): RecipeModel[] {
    return this.recipes();
  }

  getRecipe(index: number): RecipeModel {
    return this.recipes()[index];
  }

  addRecipe(recipe: RecipeModel): void {
    this.store.dispatch(RecipeActions.addRecipe({ recipe }));
  }

  updateRecipe(index: number, recipe: RecipeModel): void {
    const actualRecipe = this.recipes()[index];
    if (actualRecipe && actualRecipe.id) {
      // Preserve ID on update
      const updatedRecipe = { ...recipe, id: actualRecipe.id };
      this.store.dispatch(RecipeActions.updateRecipe({ id: actualRecipe.id, recipe: updatedRecipe }));
    }
  }

  deleteRecipe(index: number): void {
    const actualRecipe = this.recipes()[index];
    if (actualRecipe && actualRecipe.id) {
      this.store.dispatch(RecipeActions.deleteRecipe({ id: actualRecipe.id }));
    }
  }

  addIngToSl(ingredients: IngredientModel[]): void {
    this.store.dispatch(ShoppingListActions.addIngredients({ payload: ingredients }));
  }
}
