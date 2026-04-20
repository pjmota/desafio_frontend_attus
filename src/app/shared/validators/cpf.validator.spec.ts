import { FormControl } from '@angular/forms';
import { cpfValidator, isValidCpf } from './cpf.validator';

describe('cpf.validator', () => {
  it('deve validar CPFs válidos', () => {
    expect(isValidCpf('52998224725')).toBe(true);
    expect(isValidCpf('529.982.247-25')).toBe(true);
  });

  it('deve rejeitar CPF com tamanho inválido', () => {
    expect(isValidCpf('123')).toBe(false);

    const control = new FormControl('123');
    const result = cpfValidator()(control);
    expect(result).toEqual({ cpfLength: true });
  });

  it('deve rejeitar CPF com todos os dígitos iguais', () => {
    expect(isValidCpf('00000000000')).toBe(false);

    const control = new FormControl('00000000000');
    const result = cpfValidator()(control);
    expect(result).toEqual({ cpfInvalid: true });
  });

  it('deve rejeitar CPF com dígitos verificadores inválidos', () => {
    expect(isValidCpf('52998224726')).toBe(false);

    const control = new FormControl('52998224726');
    const result = cpfValidator()(control);
    expect(result).toEqual({ cpfInvalid: true });
  });

  it('não deve acusar erro quando vazio (required trata isso)', () => {
    const control = new FormControl('');
    const result = cpfValidator()(control);
    expect(result).toBeNull();
  });
});

