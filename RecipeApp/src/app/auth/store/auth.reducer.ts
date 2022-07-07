import {User} from "../../Models/user.model";

export interface AUState {
  user: User
}

const initialState: AUState = {
  user: null
}

export function authReducer(state: AUState = initialState, action) {
  return state
}
