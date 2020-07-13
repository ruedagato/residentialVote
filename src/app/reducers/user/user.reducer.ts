import { Action, createReducer, on } from '@ngrx/store';
import { UserRole } from '../../core/models/user.model';

export const userFeatureKey = 'user';

export interface State {
  role: UserRole;
}

export const initialState: State = {
  role: null,
};

export const reducer = createReducer(initialState);
