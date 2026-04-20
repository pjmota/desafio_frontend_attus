import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../models/user.model';
import { UsersState, usersAdapter, usersFeatureKey } from './users.reducer';

export const selectUsersState =
  createFeatureSelector<UsersState>(usersFeatureKey);

const { selectAll } = usersAdapter.getSelectors();

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UsersState): readonly User[] => selectAll(state)
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state: UsersState): boolean => state.loading
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state: UsersState): string | null => state.error
);

export const selectNameFilter = createSelector(
  selectUsersState,
  (state: UsersState): string => state.nameFilter
);

export const selectUsersPageIndex = createSelector(
  selectUsersState,
  (state: UsersState): number => state.pageIndex
);

export const selectUsersPageSize = createSelector(
  selectUsersState,
  (state: UsersState): number => state.pageSize
);

export const selectFilteredUsers = createSelector(
  selectAllUsers,
  selectNameFilter,
  (users: readonly User[], nameFilter: string): readonly User[] => {
    const filtro = nameFilter.trim().toLowerCase();
    if (!filtro) {
      return users;
    }
    return users.filter((u) => u.name.toLowerCase().includes(filtro));
  }
);

export const selectFilteredUsersCount = createSelector(
  selectFilteredUsers,
  (users: readonly User[]): number => users.length
);

export const selectPagedUsers = createSelector(
  selectFilteredUsers,
  selectUsersPageIndex,
  selectUsersPageSize,
  (users: readonly User[], pageIndex: number, pageSize: number): readonly User[] => {
    const start = pageIndex * pageSize;
    return users.slice(start, start + pageSize);
  }
);
