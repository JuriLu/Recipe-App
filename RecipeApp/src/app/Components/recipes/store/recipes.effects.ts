import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import * as RecipeActions from './recipes.actions';
import { RecipeModel } from '../../../Models/recipe.model';
import { ToastService } from '../../../Services/toast.service';

@Injectable()
export class RecipesEffects {
  private readonly actions$ = inject(Actions);
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly baseUrl = 'http://localhost:3000/recipes';

  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.fetchRecipes),
      mergeMap(() =>
        this.http.get<RecipeModel[]>(this.baseUrl).pipe(
          map((recipes) => RecipeActions.setRecipes({ recipes: recipes || [] })),
          catchError((err) => {
            this.toastService.show('Failed to fetch recipes.', 'error');
            return of(RecipeActions.recipesError({ error: err.message }));
          })
        )
      )
    )
  );

  addRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.addRecipe),
      mergeMap(({ recipe }) => {
        const { id, ...postData } = recipe;
        return this.http.post<RecipeModel>(this.baseUrl, postData).pipe(
          tap(() => this.toastService.show('Recipe created successfully!', 'success')),
          map(() => RecipeActions.fetchRecipes()),
          catchError((err) => {
            this.toastService.show('Failed to create recipe.', 'error');
            return of(RecipeActions.recipesError({ error: err.message }));
          })
        );
      })
    )
  );

  updateRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.updateRecipe),
      mergeMap(({ id, recipe }) => {
        return this.http.put<RecipeModel>(`${this.baseUrl}/${id}`, recipe).pipe(
          tap(() => this.toastService.show('Recipe updated successfully!', 'success')),
          map(() => RecipeActions.fetchRecipes()),
          catchError((err) => {
            this.toastService.show('Failed to update recipe.', 'error');
            return of(RecipeActions.recipesError({ error: err.message }));
          })
        );
      })
    )
  );

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.deleteRecipe),
      mergeMap(({ id }) => {
        return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
          tap(() => this.toastService.show('Recipe deleted successfully!', 'success')),
          map(() => RecipeActions.fetchRecipes()),
          catchError((err) => {
            this.toastService.show('Failed to delete recipe.', 'error');
            return of(RecipeActions.recipesError({ error: err.message }));
          })
        );
      })
    )
  );
}
