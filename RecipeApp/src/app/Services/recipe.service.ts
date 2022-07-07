import {Injectable} from '@angular/core';
import {RecipeModel} from "../Models/recipe.model";
import {IngredientModel} from "../Models/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../Components/shopping-list/store/shopping-list.actions'
import * as fromShoppingList from "../Components/shopping-list/store/shopping-list.reducer";


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<RecipeModel[]>();
  private recipes: RecipeModel[] = []

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
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
    // this.slService.addIngredients(ingredients)
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
