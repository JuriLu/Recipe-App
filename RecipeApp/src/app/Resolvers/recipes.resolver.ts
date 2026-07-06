import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RecipeModel } from '../Models/recipe.model';
import { DataStorageService } from '../Services/data-storage.service';
import { RecipeService } from '../Services/recipe.service';

export const recipesResolver: ResolveFn<RecipeModel[]> = (route, state) => {
  const recipesService = inject(RecipeService);
  const dataStorageService = inject(DataStorageService);
  const recipes = recipesService.getRecipes();

  if (recipes.length === 0) {
    return dataStorageService.fetchRecipes();
  } else {
    return recipes;
  }
};
