import { createReducer, on } from '@ngrx/store';
import { RecipeModel } from '../../../Models/recipe.model';
import * as RecipeActions from './recipes.actions';

export interface RecipesState {
  recipes: RecipeModel[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

export const recipesReducer = createReducer(
  initialState,
  on(RecipeActions.fetchRecipes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RecipeActions.setRecipes, (state, { recipes }) => ({
    ...state,
    recipes: [...recipes],
    loading: false,
    error: null,
  })),
  on(RecipeActions.recipesError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
