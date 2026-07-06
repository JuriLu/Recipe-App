import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';

import { RecipeModel } from '../Models/recipe.model';
import { RecipeService } from '../Services/recipe.service';
import * as fromAppReducer from '../store/app.reducer';

export const recipesResolver: ResolveFn<RecipeModel[]> = (route, state) => {
  const recipesService = inject(RecipeService);
  const store = inject(Store<fromAppReducer.AppState>);
  const recipes = recipesService.getRecipes();

  if (recipes.length === 0) {
    recipesService.fetchRecipes();
    return store.select((s) => s.recipes.recipes).pipe(
      filter((recipesList) => recipesList.length > 0),
      take(1),
    );
  } else {
    return recipes;
  }
};
