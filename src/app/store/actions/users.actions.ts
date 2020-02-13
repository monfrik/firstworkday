import { createAction, props } from '@ngrx/store';
import { UserModel } from '@app/users/models';

export const fetchUsers = createAction(
  '[Users] Fetch Users',
  props<{users: UserModel[]}>()
);