export type SHLATypes = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient  //shopping list action types

import {Action} from "@ngrx/store";
import {IngredientModel} from "../../../Models/ingredient.model";


export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENTS';

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS

  constructor(public payload: IngredientModel[]) {
  }
}

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT

  constructor(public payload: IngredientModel) {
  }
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT

  constructor(public payload: { index: number, ingredient: IngredientModel }) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT

  constructor(public payload: number) {
  }
}

