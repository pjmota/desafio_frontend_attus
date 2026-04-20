import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Inject, Optional, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { PhoneType, User } from '../../models/user.model';
import { cpfValidator } from '../../../../shared/validators/cpf.validator';
import { phoneValidator } from '../../../../shared/validators/phone.validator';
import { PhoneMaskDirective } from '../../../../shared/directives/phone-mask.directive';
import { CpfMaskDirective } from '../../../../shared/directives/cpf-mask.directive';

export type UserDialogData = {
  user?: User;
};

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    PhoneMaskDirective,
    CpfMaskDirective,
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
})
export class UserDialogComponent {
  readonly phoneTypes: readonly PhoneType[] = ['Celular', 'Fixo'];

  readonly data: UserDialogData;
  private readonly toastr: ToastrService;
  private readonly destroyRef = inject(DestroyRef);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    cpf: ['', [Validators.required, cpfValidator()]],
    phone: ['', [Validators.required]],
    phoneType: ['Celular' as PhoneType, [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<UserDialogComponent, User | null>,
    toastr: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) data: UserDialogData | null
  ) {
    this.toastr = toastr;
    this.data = data ?? {};

    if (this.data.user) {
      this.form.setValue({
        name: this.data.user.name,
        email: this.data.user.email,
        cpf: this.data.user.cpf,
        phone: this.data.user.phone,
        phoneType: this.data.user.phoneType,
      });
    }

    this.form.controls.phone.addValidators(
      phoneValidator(() => this.form.controls.phoneType.value)
    );
    this.form.controls.phone.updateValueAndValidity({ emitEvent: false });

    this.form.controls.phoneType.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.form.controls.phone.updateValueAndValidity();
      });
  }

  get title(): string {
    return this.data.user ? 'Editar usuário' : 'Adicionar novo usuário';
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastr.error('Verifique os campos e tente novamente', 'Formulário inválido');
      return;
    }

    const value = this.form.getRawValue();

    const user: User = {
      id: this.data.user?.id ?? this.createId(),
      name: value.name.trim(),
      email: value.email.trim(),
      cpf: value.cpf.replaceAll(/\D/g, '').trim(),
      phone: value.phone.replaceAll(/\D/g, '').trim(),
      phoneType: value.phoneType,
    };

    this.dialogRef.close(user);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }

  private createId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `u_${Math.random().toString(36).slice(2, 10)}`;
  }
}
