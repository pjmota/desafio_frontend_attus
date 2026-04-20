import { formatPhone, maxPhoneDigitsForType, sanitizeDigits } from './phone';

describe('phone utils', () => {
  describe('sanitizeDigits', () => {
    it('deve extrair apenas os números de uma string', () => {
      expect(sanitizeDigits('(11) 98765-4321')).toBe('11987654321');
      expect(sanitizeDigits('abc123def')).toBe('123');
    });

    it('deve extrair números de number ou bigint', () => {
      expect(sanitizeDigits(12345)).toBe('12345');
      expect(sanitizeDigits(BigInt(98765432100))).toBe('98765432100');
    });

    it('deve retornar string vazia para tipos inválidos ou nulos', () => {
      expect(sanitizeDigits(null)).toBe('');
      expect(sanitizeDigits(undefined)).toBe('');
      expect(sanitizeDigits({})).toBe('');
    });
  });

  describe('maxPhoneDigitsForType', () => {
    it('deve retornar 10 para Fixo', () => {
      expect(maxPhoneDigitsForType('Fixo')).toBe(10);
    });

    it('deve retornar 11 para Celular ou WhatsApp', () => {
      expect(maxPhoneDigitsForType('Celular')).toBe(11);
      expect(maxPhoneDigitsForType('WhatsApp')).toBe(11);
    });
  });

  describe('formatPhone - Fixo', () => {
    it('deve formatar telefone Fixo progressivamente', () => {
      expect(formatPhone('', 'Fixo')).toBe('');
      expect(formatPhone('1', 'Fixo')).toBe('(1');
      expect(formatPhone('11', 'Fixo')).toBe('(11');
      expect(formatPhone('112', 'Fixo')).toBe('(11) 2');
      expect(formatPhone('112345', 'Fixo')).toBe('(11) 2345');
      expect(formatPhone('1123456', 'Fixo')).toBe('(11) 2345-6');
      expect(formatPhone('1123456789', 'Fixo')).toBe('(11) 2345-6789');
    });

    it('deve limitar a formatação de Fixo a 10 dígitos', () => {
      expect(formatPhone('11234567899999', 'Fixo')).toBe('(11) 2345-6789');
    });
  });

  describe('formatPhone - Celular/WhatsApp', () => {
    it('deve formatar telefone Celular progressivamente', () => {
      expect(formatPhone('', 'Celular')).toBe('');
      expect(formatPhone('1', 'Celular')).toBe('(1');
      expect(formatPhone('11', 'Celular')).toBe('(11');
      expect(formatPhone('119', 'Celular')).toBe('(11) 9');
      expect(formatPhone('1198', 'Celular')).toBe('(11) 9 8');
      expect(formatPhone('1198765', 'Celular')).toBe('(11) 9 8765');
      expect(formatPhone('11987654', 'Celular')).toBe('(11) 9 8765-4');
      expect(formatPhone('11987654321', 'Celular')).toBe('(11) 9 8765-4321');
    });

    it('deve limitar a formatação de Celular a 11 dígitos', () => {
      expect(formatPhone('11987654321999', 'Celular')).toBe('(11) 9 8765-4321');
    });
  });
});
