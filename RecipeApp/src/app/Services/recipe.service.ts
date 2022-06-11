import {Injectable} from '@angular/core';
import {RecipeModel} from "../Models/recipe.model";
import {IngredientModel} from "../Models/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<RecipeModel[]>();

 // private recipes:RecipeModel[] = [
 //    new RecipeModel(
 //      'Schnitzel',
 //      'Super Tasty Schnitzel',
 //      'https://media.istockphoto.com/photos/fried-pork-chop-potatoes-and-white-mushrooms-in-frying-pan-picture-id1329848921?b=1&k=20&m=1329848921&s=170667a&w=0&h=zYhMvwDHE-3bCbiGEz3lOB8gbyO_kQU3Res4zVNY4Sc=',
 //      [
 //        new IngredientModel('Meat',1),
 //        new IngredientModel('Letuce',2),
 //        new IngredientModel('French Fries',20)
 //      ]),
 //    new RecipeModel(
 //      'Buger',
 //      'Amazing Buger King',
 //      'https://media.istockphoto.com/photos/burger-king-lies-on-a-wooden-board-dark-photo-flying-food-picture-id1342886871?b=1&k=20&m=1342886871&s=170667a&w=0&h=K6QhgjuWFrwWaMDNI-_kaFZ4Guw1w-tvGL0H-jgQ3H0=',
 //      [
 //        new IngredientModel("Buns",2),
 //        new IngredientModel("Burger",1),
 //        new IngredientModel("Tomatos",1),
 //        new IngredientModel("Letuce",1),
 //        new IngredientModel("Chees",1),
 //        new IngredientModel("Onion",1),
 //        new IngredientModel("Ketchup",1)
 //      ])
 //  ];

  private recipes:RecipeModel[] =[]

 setRecipes(recipes:RecipeModel[]){
  this.recipes = recipes;
  this.recipesChanged.next(this.recipes.slice())
 }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngToSl(ingredients:IngredientModel[]){
    this.slService.addIngredients(ingredients)
  }

  getRecipe(id:number){
    return this.recipes[id];
  }

  addRecipe(recipe:RecipeModel){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index:number,recipe:RecipeModel){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice())
  }

  constructor(private slService:ShoppingListService) { }
}
