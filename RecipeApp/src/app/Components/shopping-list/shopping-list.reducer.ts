import {IngredientModel} from "../../Models/ingredient.model";
import {Action} from "@ngrx/store";

const initialState = {
  ingredients: [
    new IngredientModel('Apples',5),
    new IngredientModel('Pomodorini',50),
  ]
}

export function shoppingListReducer(state=initialState,action:Action){
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return{
        ...state,
        ingredients: [...state.ingredients, action]
      }
  }

}
