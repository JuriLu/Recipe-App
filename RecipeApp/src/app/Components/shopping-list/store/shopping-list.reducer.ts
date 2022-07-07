import {IngredientModel} from "../../../Models/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface AppState {
  shoppingList:SLState
}

export interface SLState {
  ingredients: IngredientModel[];
  editedIngredient: IngredientModel;
  editedIngredientIndex: number
}

const initialState: SLState = {
  ingredients: [
    new IngredientModel('Apples', 5),
    new IngredientModel('Pomodorini', 50),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export function shoppingListReducer(
  state: SLState = initialState,
  action: ShoppingListActions.SHLATypes
) {
  switch (action.type) {

    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]   // ...action.payload because we want to add the elements of the array no the whole array
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index] // this is the ingredient we want to edit
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      }
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient

      return {
        ...state,
        ingredients: updatedIngredients
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {    //filter function return a new array of its elements if the condition returns true
          return igIndex !== action.payload;                                            //The condition
        })
      };

    default:
      return state;
  }

}
