import { createReducer, on } from '@ngrx/store';
import * as userAction from './user.actions';
import { AdminModel } from 'app/core/models/admin.model';

export interface State {
  admin: AdminModel;
}

export const initialState: State = {
  admin: null,
};

export const reducer = createReducer(
  initialState,
  on(userAction.loadComplete, (state, { user }) => ({ ...state, admin: user })),
);
