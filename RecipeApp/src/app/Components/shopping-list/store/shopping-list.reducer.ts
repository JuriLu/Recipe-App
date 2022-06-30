import {IngredientModel} from "../../../Models/ingredient.model";
import {Action} from "@ngrx/store";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new IngredientModel('Apples', 5),
    new IngredientModel('Pomodorini', 50),
  ]
}

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.SHLATypes
  ){
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDENTS:
      return {
        ...state,
        ingredients: [...state.ingredients,...action.payload]   // ...action.payload because we want to add the elements of the array no the whole array
      }
    default:
      return state;
  }

}
