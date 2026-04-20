import { formatCpf } from './cpf';

describe('formatCpf', () => {
  it('deve formatar CPF completo com 11 dígitos', () => {
    expect(formatCpf('52998224725')).toBe('529.982.247-25');
    expect(formatCpf('529.982.247-25')).toBe('529.982.247-25');
  });

  it('deve formatar parcialmente conforme digita', () => {
    expect(formatCpf('1')).toBe('1');
    expect(formatCpf('123')).toBe('123');
    expect(formatCpf('1234')).toBe('123.4');
    expect(formatCpf('123456')).toBe('123.456');
    expect(formatCpf('1234567')).toBe('123.456.7');
    expect(formatCpf('123456789')).toBe('123.456.789');
    expect(formatCpf('1234567890')).toBe('123.456.789-0');
  });

  it('deve aceitar apenas números e limitar em 11 dígitos', () => {
    expect(formatCpf('abc123.456.789-01234')).toBe('123.456.789-01');
  });
});
