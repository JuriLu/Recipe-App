import {User} from "../../Models/user.model";
import * as AUActions from "./auth.actions";

export interface AUState {
  user: User
}

const initialState: AUState = {
  user: null
}

export function authReducer(state: AUState = initialState, action: AUActions.AuthActions) {
  switch (action.type) {
    case AUActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      )
      return {
        ...state,
        user   // user:user
      }
    case AUActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}
