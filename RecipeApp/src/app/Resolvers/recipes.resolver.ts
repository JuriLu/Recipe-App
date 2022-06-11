import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {RecipeModel} from "../Models/recipe.model";
import {DataStorageService} from "../Services/data-storage.service";
import {RecipeService} from "../Services/recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<RecipeModel[]> {

  constructor(private dataStorageService:DataStorageService,private recipesService:RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes:RecipeModel[] = this.recipesService.getRecipes()

    if (recipes.length === 0){
      return this.dataStorageService.fetchRecipes()
    } else{
      return recipes
    }
  }
}
