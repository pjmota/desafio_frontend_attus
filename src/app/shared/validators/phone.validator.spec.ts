import { FormControl } from '@angular/forms';
import { PhoneType } from '../../features/users/models/user.model';
import { phoneValidator } from './phone.validator';

describe('phone.validator', () => {
  const validate = (type: PhoneType, value: string) => {
    const control = new FormControl(value);
    return phoneValidator(() => type)(control);
  };

  it('deve aceitar telefone fixo com 10 dígitos', () => {
    expect(validate('Fixo', '(11) 2345-6789')).toBeNull();
    expect(validate('Fixo', '1123456789')).toBeNull();
  });

  it('deve rejeitar telefone fixo com tamanho inválido', () => {
    expect(validate('Fixo', '(11) 92345-6789')).toEqual({
      phoneLength: { expected: 10, actual: 11 },
    });
  });

  it('deve aceitar celular com 11 dígitos e 9 após o DDD', () => {
    expect(validate('Celular', '(11) 9 2345-6789')).toBeNull();
    expect(validate('WhatsApp', '11923456789')).toBeNull();
  });

  it('deve rejeitar celular sem 9 após o DDD', () => {
    expect(validate('Celular', '(11) 8 2345-6789')).toEqual({ phoneMobileInvalid: true });
  });
});

