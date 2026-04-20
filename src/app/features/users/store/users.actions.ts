import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: readonly User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);

export const setNameFilter = createAction(
  '[Users] Set Name Filter',
  props<{ name: string }>()
);

export const upsertUser = createAction(
  '[Users] Upsert User',
  props<{ user: User }>()
);

export const setUsersPagination = createAction(
  '[Users] Set Pagination',
  props<{ pageIndex: number; pageSize: number }>()
);
