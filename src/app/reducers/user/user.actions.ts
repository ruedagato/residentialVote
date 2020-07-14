import { createAction, props } from '@ngrx/store';
import { AdminModel } from 'app/core/models/admin.model';

const group = '[User] ';
const GET_USER_DATA = group + 'load user';
const LOAD_USER_COMPLETE = group + 'load complete';

export const loadUsers = createAction(GET_USER_DATA, props<{ uid: string }>());
export const loadComplete = createAction(LOAD_USER_COMPLETE, props<{ user: AdminModel }>());
