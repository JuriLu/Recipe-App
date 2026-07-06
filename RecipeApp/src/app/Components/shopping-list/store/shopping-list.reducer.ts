import { createReducer, on } from '@ngrx/store';
import { IngredientModel } from '../../../Models/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface SLState {
  ingredients: IngredientModel[];
  editedIngredient: IngredientModel | null;
  editedIngredientIndex: number;
}

const initialState: SLState = {
  ingredients: [
    new IngredientModel('Apples', 5),
    new IngredientModel('Pomodorini', 50),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,

  on(ShoppingListActions.addIngredient, (state, { payload }) => ({
    ...state,
    ingredients: [...state.ingredients, payload],
  })),

  on(ShoppingListActions.addIngredients, (state, { payload }) => ({
    ...state,
    ingredients: [...state.ingredients, ...payload],
  })),

  on(ShoppingListActions.updateIngredient, (state, { payload }) => {
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = {
      ...state.ingredients[state.editedIngredientIndex],
      ...payload,
    };
    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),

  on(ShoppingListActions.deleteIngredient, (state) => ({
    ...state,
    ingredients: state.ingredients.filter(
      (_, idx) => idx !== state.editedIngredientIndex
    ),
    editedIngredient: null,
    editedIngredientIndex: -1,
  })),

  on(ShoppingListActions.startEdit, (state, { payload }) => ({
    ...state,
    editedIngredientIndex: payload,
    editedIngredient: { ...state.ingredients[payload] },
  })),

  on(ShoppingListActions.stopEdit, (state) => ({
    ...state,
    editedIngredient: null,
    editedIngredientIndex: -1,
  }))
);
