import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const sanitizeDigits = (value: unknown): string => {
  if (typeof value === 'string') {
    return value.replaceAll(/\D/g, '');
  }
  if (typeof value === 'number' || typeof value === 'bigint') {
    return String(value).replaceAll(/\D/g, '');
  }
  return '';
};

export const isValidCpf = (value: unknown): boolean => {
  const cpf = sanitizeDigits(value);

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  const digits = cpf.split('').map(Number);

  const calcDigit = (length: number): number => {
    let sum = 0;
    for (let i = 0; i < length; i += 1) {
      sum += digits[i] * (length + 1 - i);
    }
    const result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
  };

  const d1 = calcDigit(9);
  if (d1 !== digits[9]) {
    return false;
  }

  const d2 = calcDigit(10);
  return d2 === digits[10];
};

export const cpfValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = control.value;
    const cpf = sanitizeDigits(raw);

    if (!cpf) {
      return null;
    }

    if (cpf.length !== 11) {
      return { cpfLength: true };
    }

    if (!isValidCpf(cpf)) {
      return { cpfInvalid: true };
    }

    return null;
  };
};
