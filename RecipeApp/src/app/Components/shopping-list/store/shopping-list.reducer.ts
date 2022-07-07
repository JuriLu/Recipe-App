import {IngredientModel} from "../../../Models/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";


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
        ...state, //always needed bcs we have more than just ingredients state or editedIngredient ect...
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,//always needed bcs we have more than just ingredients state or editedIngredient ect...
        ingredients: [...state.ingredients, ...action.payload]   // ...action.payload because we want to add the elements of the array no the whole array
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex] // this is the ingredient we want to edit
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      }
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient

      return {
        ...state, //always needed bcs we have more than just ingredients state or editedIngredient ect...
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {    //filter function return a new array of its elements if the condition returns true
          return igIndex !== state.editedIngredientIndex;                                            //The condition
        }),
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,//always needed bcs we have more than just ingredients state or editedIngredient ect...
      editedIngredientIndex : action.payload,
      editedIngredient: {...state.ingredients[action.payload]}   //{...} reference type issue in this case
      }

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      }

    default:
      return state;
  }

}
