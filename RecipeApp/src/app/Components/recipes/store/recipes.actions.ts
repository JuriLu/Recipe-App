import { createAction, props } from '@ngrx/store';
import { RecipeModel } from '../../../Models/recipe.model';

export const fetchRecipes = createAction('[Recipes] Fetch Recipes');
export const setRecipes = createAction('[Recipes] Set Recipes', props<{ recipes: RecipeModel[] }>());
export const addRecipe = createAction('[Recipes] Add Recipe', props<{ recipe: RecipeModel }>());
export const updateRecipe = createAction('[Recipes] Update Recipe', props<{ id: string; recipe: RecipeModel }>());
export const deleteRecipe = createAction('[Recipes] Delete Recipe', props<{ id: string }>());
export const recipesError = createAction('[Recipes] Recipes Error', props<{ error: string }>());
