import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { PhoneType } from '../../features/users/models/user.model';
import { formatPhone, sanitizeDigits } from '../utils/phone';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective implements OnChanges {
  private readonly el = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly ngControl = inject(NgControl, { optional: true });

  @Input('appPhoneMask') phoneType: PhoneType = 'Celular';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['phoneType']) {
      this.applyFormatting();
    }
  }

  @HostListener('input')
  onInput(): void {
    this.applyFormatting();
  }

  @HostListener('blur')
  onBlur(): void {
    this.applyFormatting();
  }

  private applyFormatting(): void {
    const input = this.el.nativeElement;
    const digits = sanitizeDigits(input.value);
    const formatted = formatPhone(digits, this.phoneType);

    input.value = formatted;

    const control = this.ngControl?.control;
    if (!control) {
      return;
    }

    if (control.value !== formatted) {
      control.setValue(formatted, { emitEvent: false });
      control.markAsDirty();
    }
  }
}

