import { PhoneType } from '../../features/users/models/user.model';

export const sanitizeDigits = (value: unknown): string => {
  if (typeof value === 'string') {
    return value.replaceAll(/\D/g, '');
  }
  if (typeof value === 'number' || typeof value === 'bigint') {
    return String(value).replaceAll(/\D/g, '');
  }
  return '';
};

export const maxPhoneDigitsForType = (type: PhoneType): number =>
  type === 'Fixo' ? 10 : 11;

export const formatPhone = (value: unknown, type: PhoneType): string => {
  const digits = sanitizeDigits(value).slice(0, maxPhoneDigitsForType(type));

  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (type === 'Fixo') {
    const part1 = rest.slice(0, 4);
    const part2 = rest.slice(4, 8);

    if (!digits) {
      return '';
    }

    if (digits.length <= 2) {
      return `(${ddd}`;
    }
    if (digits.length <= 6) {
      return `(${ddd}) ${part1}`;
    }
    return `(${ddd}) ${part1}-${part2}`;
  }

  const ninth = rest.slice(0, 1);
  const part1 = rest.slice(1, 5);
  const part2 = rest.slice(5, 9);

  if (!digits) {
    return '';
  }

  if (digits.length <= 2) {
    return `(${ddd}`;
  }
  if (digits.length <= 3) {
    return `(${ddd}) ${ninth}`;
  }
  if (digits.length <= 7) {
    return `(${ddd}) ${ninth} ${part1}`;
  }
  return `(${ddd}) ${ninth} ${part1}-${part2}`;
};
