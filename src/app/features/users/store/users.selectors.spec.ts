import { User } from '../models/user.model';
import { initialUsersState, usersAdapter, usersFeatureKey } from './users.reducer';
import { selectFilteredUsers, selectPagedUsers } from './users.selectors';

describe('users.selectors', () => {
  it('deve filtrar por nome', () => {
    const users: readonly User[] = [
      {
        id: '1',
        name: 'Ana Silva',
        email: 'ana@empresa.com',
        cpf: '12345678901',
        phone: '11999990000',
        phoneType: 'Celular',
      },
      {
        id: '2',
        name: 'Bruno Costa',
        email: 'bruno@empresa.com',
        cpf: '98765432100',
        phone: '11333330000',
        phoneType: 'Fixo',
      },
    ];

    const state = usersAdapter.setAll([...users], {
      ...initialUsersState,
      nameFilter: 'ana',
    });

    const result = selectFilteredUsers.projector(users, 'ana');
    expect(result.map((u) => u.id)).toEqual(['1']);

    const rootState = { [usersFeatureKey]: state } as const;
    expect(selectFilteredUsers(rootState as any).map((u) => u.id)).toEqual(['1']);
  });

  it('deve paginar usuários filtrados', () => {
    const users: readonly User[] = [
      {
        id: '1',
        name: 'Ana Silva',
        email: 'ana@empresa.com',
        cpf: '12345678901',
        phone: '11999990000',
        phoneType: 'Celular',
      },
      {
        id: '2',
        name: 'Bruno Costa',
        email: 'bruno@empresa.com',
        cpf: '98765432100',
        phone: '11333330000',
        phoneType: 'Fixo',
      },
      {
        id: '3',
        name: 'Carla Souza',
        email: 'carla@empresa.com',
        cpf: '11122233344',
        phone: '11988887777',
        phoneType: 'Celular',
      },
    ];

    const state = usersAdapter.setAll([...users], {
      ...initialUsersState,
      nameFilter: '',
      pageIndex: 1,
      pageSize: 1,
    });

    const rootState = { [usersFeatureKey]: state } as const;
    expect(selectPagedUsers(rootState as any).map((u) => u.id)).toEqual(['2']);
  });
});
