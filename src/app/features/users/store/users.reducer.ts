import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  setUsersPagination,
  setNameFilter,
  upsertUser,
} from './users.actions';

export const usersFeatureKey = 'users';

export const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

export type UsersState = EntityState<User> & {
  loading: boolean;
  error: string | null;
  nameFilter: string;
  pageIndex: number;
  pageSize: number;
};

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  loading: false,
  error: null,
  nameFilter: '',
  pageIndex: 0,
  pageSize: 10,
});

export const usersReducer = createReducer(
  initialUsersState,
  on(loadUsers, (state: UsersState) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadUsersSuccess, (state: UsersState, { users }: { users: readonly User[] }) =>
    usersAdapter.setAll([...users], {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(loadUsersFailure, (state: UsersState, { error }: { error: string }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setNameFilter, (state: UsersState, { name }: { name: string }) => ({
    ...state,
    nameFilter: name,
    pageIndex: 0,
  })),
  on(
    setUsersPagination,
    (state: UsersState, { pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => ({
      ...state,
      pageIndex,
      pageSize,
    })
  ),
  on(upsertUser, (state: UsersState, { user }: { user: User }) =>
    usersAdapter.upsertOne(user, state)
  )
);
