import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly shouldFail = false;

  private readonly users: User[] = [
    {
      id: 'u1',
      name: 'Ana Silva',
      email: 'ana.silva@empresa.com',
      cpf: '12345678901',
      phone: '11999990000',
      phoneType: 'Celular',
    },
    {
      id: 'u2',
      name: 'Bruno Costa',
      email: 'bruno.costa@empresa.com',
      cpf: '98765432100',
      phone: '11333330000',
      phoneType: 'Fixo',
    },
    {
      id: 'u3',
      name: 'Carla Souza',
      email: 'carla.souza@empresa.com',
      cpf: '11122233344',
      phone: '11988887777',
      phoneType: 'WhatsApp',
    },
    {
      id: 'u4',
      name: 'Larry S. Conner',
      email: 'larry.conner@empresa.com',
      cpf: '11122233344',
      phone: '11988887777',
      phoneType: 'WhatsApp',
    },
    {
      id: 'u5',
      name: 'Emily Verbeke',
      email: 'emily.souza@empresa.com',
      cpf: '11122233344',
      phone: '11988887777',
      phoneType: 'WhatsApp',
    },
    {
      id: 'u6',
      name: 'Maryam David',
      email: 'carla.souza@empresa.com',
      cpf: '11122233344',
      phone: '11988887777',
      phoneType: 'WhatsApp',
    },
  ];

  listUsers(): Observable<readonly User[]> {
    if (this.shouldFail) {
      return throwError(() => new Error('Falha ao carregar usuários')).pipe(delay(700));
    }

    return of(this.users.map((u) => ({ ...u }))).pipe(delay(700));
  }
}

