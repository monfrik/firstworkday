import { createSelector } from '@ngrx/store';
 
export interface AppState {
  users: number;
}
 
export const selectUsers = (state: AppState) => state.users;
 
export const selectUser = createSelector(
  selectUsers,
  (state: number, props) => state[props.id]
);