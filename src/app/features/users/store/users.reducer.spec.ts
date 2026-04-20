import { User } from '../models/user.model';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  setNameFilter,
  setUsersPagination,
  upsertUser,
} from './users.actions';
import { initialUsersState, usersReducer } from './users.reducer';

describe('usersReducer', () => {
  it('deve setar loading ao carregar', () => {
    const state = usersReducer(initialUsersState, loadUsers());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('deve salvar usuários no success e desligar loading', () => {
    const users: readonly User[] = [
      {
        id: '1',
        name: 'Ana',
        email: 'ana@empresa.com',
        cpf: '12345678901',
        phone: '11999990000',
        phoneType: 'Celular',
      },
    ];

    const state = usersReducer(initialUsersState, loadUsersSuccess({ users }));
    expect(state.loading).toBe(false);
    expect(state.ids).toEqual(['1']);
  });

  it('deve salvar erro no failure e desligar loading', () => {
    const state = usersReducer(initialUsersState, loadUsersFailure({ error: 'x' }));
    expect(state.loading).toBe(false);
    expect(state.error).toBe('x');
  });

  it('deve atualizar filtro de nome', () => {
    const state = usersReducer(initialUsersState, setNameFilter({ name: 'ana' }));
    expect(state.nameFilter).toBe('ana');
    expect(state.pageIndex).toBe(0);
  });

  it('deve atualizar paginação', () => {
    const state = usersReducer(
      initialUsersState,
      setUsersPagination({ pageIndex: 2, pageSize: 25 })
    );
    expect(state.pageIndex).toBe(2);
    expect(state.pageSize).toBe(25);
  });

  it('deve upsert usuário', () => {
    const user: User = {
      id: '1',
      name: 'Ana',
      email: 'ana@empresa.com',
      cpf: '12345678901',
      phone: '11999990000',
      phoneType: 'Celular',
    };

    const state = usersReducer(initialUsersState, upsertUser({ user }));
    expect(state.ids).toEqual(['1']);
  });
});
