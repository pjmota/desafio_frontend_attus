export const formatCpf = (value: unknown): string => {
  const digits = (() => {
    if (typeof value === 'string') {
      return value.replaceAll(/\D/g, '');
    }
    if (typeof value === 'number' || typeof value === 'bigint') {
      return String(value).replaceAll(/\D/g, '');
    }
    return '';
  })().slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  }

  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};
