import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../models/user.model';
import { loadUsers, setUsersPagination } from '../../store/users.actions';
import {
  selectFilteredUsersCount,
  selectPagedUsers,
  selectUsersPageIndex,
  selectUsersPageSize,
  selectUsersError,
  selectUsersLoading,
} from '../../store/users.selectors';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  private readonly store = inject(Store);

  readonly editar = output<User>();

  readonly users$: Observable<readonly User[]> = this.store.select(selectPagedUsers);
  readonly total$: Observable<number> = this.store.select(selectFilteredUsersCount);
  readonly pageIndex$: Observable<number> = this.store.select(selectUsersPageIndex);
  readonly pageSize$: Observable<number> = this.store.select(selectUsersPageSize);
  readonly loading$: Observable<boolean> = this.store.select(selectUsersLoading);
  readonly error$: Observable<string | null> = this.store.select(selectUsersError);

  recarregar(): void {
    this.store.dispatch(loadUsers());
  }

  mudarPagina(event: PageEvent): void {
    this.store.dispatch(
      setUsersPagination({ pageIndex: event.pageIndex, pageSize: event.pageSize })
    );
  }
}

