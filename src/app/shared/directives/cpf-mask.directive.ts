import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { formatCpf } from '../utils/cpf';

@Directive({
  selector: '[appCpfMask]',
  standalone: true,
})
export class CpfMaskDirective {
  private readonly el = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly ngControl = inject(NgControl, { optional: true });

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
    const digits = input.value.replaceAll(/\D/g, '').slice(0, 11);
    const formatted = formatCpf(digits);

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
