import {Injectable} from '@angular/core';
import {RecipeModel} from "../Models/recipe.model";
import {IngredientModel} from "../Models/ingredient.model";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../Components/shopping-list/store/shopping-list.actions'
import * as fromAppReducer from "../store/app.reducer";


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<RecipeModel[]>();
  private recipes: RecipeModel[] = []

  constructor(
    private store: Store<fromAppReducer.AppState>
  ) {
  }


  setRecipes(recipes: RecipeModel[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngToSl(ingredients: IngredientModel[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients)) //NgRx
  }


  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: RecipeModel) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }

}
