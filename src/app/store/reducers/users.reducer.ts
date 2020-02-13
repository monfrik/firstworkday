import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as UsersActions from '@app/store/actions';

import { UserModel } from '@app/users/models';

 
export const initialState: UserModel[] = [];
 
const _usersReducer = createReducer(
  initialState,
  on(UsersActions.fetchUsers, (state, { users }) => users),
);
 
export function reducer(state: UserModel[] | undefined, action: Action) {
  return _usersReducer(state, action);
}

export const selectUsers = (state: any) => state.users;

export const selectUser = createSelector(
  selectUsers,
  (state: UserModel[], props) => {
    return state[props.id];
  }
);
