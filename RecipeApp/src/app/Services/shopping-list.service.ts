import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {IngredientModel} from "../Models/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
    ingredientsChanged = new Subject<IngredientModel[]>()
    startedEditing = new Subject<number>()

  // private ingredients:IngredientModel[] = [
  //   new IngredientModel('Apples',5),
  //   new IngredientModel('Pomodorini',50),
  // ];

  private ingredients:IngredientModel[] =[]

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient:IngredientModel){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients:IngredientModel[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number,newIngredient:IngredientModel){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index){
    this.ingredients.splice(index,1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }


}
