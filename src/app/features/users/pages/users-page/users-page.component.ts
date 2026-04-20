import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { UsersHeaderComponent } from '../../components/users-header/users-header.component';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { loadUsers, upsertUser } from '../../store/users.actions';
import { selectUsersError } from '../../store/users.selectors';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    CommonModule,
    UsersHeaderComponent,
    UsersListComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  private readonly toastr = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.store.dispatch(loadUsers());

    this.store
      .select(selectUsersError)
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((error: string | null) => {
        if (error) {
          this.toastr.error(error, 'Erro');
        }
      });
  }

  abrirNovoUsuario(): void {
    const ref = this.dialog.open(UserDialogComponent, {
      disableClose: false,
    });

    ref.afterClosed().pipe(take(1)).subscribe((user: User | null | undefined) => {
      if (!user) {
        return;
      }
      this.store.dispatch(upsertUser({ user }));
      this.toastr.success('Usuário salvo com sucesso', 'Sucesso');
    });
  }

  abrirEdicao(user: User): void {
    const ref = this.dialog.open(UserDialogComponent, {
      disableClose: false,
      data: { user },
    });

    ref.afterClosed().pipe(take(1)).subscribe((updated: User | null | undefined) => {
      if (!updated) {
        return;
      }
      this.store.dispatch(upsertUser({ user: updated }));
      this.toastr.success('Usuário salvo com sucesso', 'Sucesso');
    });
  }
}
