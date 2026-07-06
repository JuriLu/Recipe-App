import { createReducer, on } from '@ngrx/store';
import { User } from '../../Models/user.model';
import * as AuthActions from './auth.actions';

export interface AUState {
  user: User | null;
}

const initialState: AUState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { email, userId, token, expirationDate }) => ({
    ...state,
    user: new User(email, userId, token, expirationDate),
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
  }))
);
