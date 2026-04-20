export const formatCpf = (value: unknown): string => {
  const digits = (() => {
    if (typeof value === 'string') {
      return value.replaceAll(/\D/g, '');
    }
    if (typeof value === 'number' || typeof value === 'bigint') {
      return String(value).replaceAll(/\D/g, '');
    }
    return '';
  })();

  if (digits.length !== 11) {
    return digits;
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
};
