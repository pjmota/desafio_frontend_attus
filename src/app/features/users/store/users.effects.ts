import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersApiService } from '../services/users-api.service';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './users.actions';

@Injectable()
export class UsersEffects {
  readonly loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.api.listUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error: unknown) =>
            of(loadUsersFailure({ error: this.toMessage(error) }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly api: UsersApiService
  ) {}

  private toMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Erro inesperado';
  }
}

