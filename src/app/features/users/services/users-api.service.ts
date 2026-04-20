import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.model';
import { USERS_MOCK } from './users.mock';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly shouldFail = false;

  listUsers(): Observable<readonly User[]> {
    if (this.shouldFail) {
      return throwError(() => new Error('Falha ao carregar usuários')).pipe(delay(700));
    }

    return of(USERS_MOCK.map((u) => ({ ...u }))).pipe(delay(700));
  }
}
