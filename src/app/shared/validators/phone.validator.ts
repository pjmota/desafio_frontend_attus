import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PhoneType } from '../../features/users/models/user.model';
import { maxPhoneDigitsForType, sanitizeDigits } from '../utils/phone';

export const phoneValidator = (getType: () => PhoneType): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = control.value;
    const digits = sanitizeDigits(raw);

    if (!digits) {
      return null;
    }

    const type = getType();
    const expected = maxPhoneDigitsForType(type);

    if (digits.length !== expected) {
      return { phoneLength: { expected, actual: digits.length } };
    }

    if (type !== 'Fixo') {
      if (digits[2] !== '9') {
        return { phoneMobileInvalid: true };
      }
    }

    return null;
  };
};

