export type SHLATypes = AddIngredient | AddIngredients  //shopping list action types

import {Action} from "@ngrx/store";
import {IngredientModel} from "../../../Models/ingredient.model";


export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDENTS = 'ADD_INGREDIENTS'

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT

  constructor(public payload: IngredientModel) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDENTS

  constructor(public payload: IngredientModel[]) {}
}

