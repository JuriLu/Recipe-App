import { createAction, props } from '@ngrx/store';
import { IngredientModel } from '../../../Models/ingredient.model';

export const addIngredient = createAction(
  '[ShoppingList] Add Ingredient',
  props<{ payload: IngredientModel }>()
);

export const addIngredients = createAction(
  '[ShoppingList] Add Ingredients',
  props<{ payload: IngredientModel[] }>()
);

export const updateIngredient = createAction(
  '[ShoppingList] Update Ingredient',
  props<{ payload: IngredientModel }>()
);

export const deleteIngredient = createAction('[ShoppingList] Delete Ingredient');

export const startEdit = createAction(
  '[ShoppingList] Start Edit',
  props<{ payload: number }>()
);

export const stopEdit = createAction('[ShoppingList] Stop Edit');
