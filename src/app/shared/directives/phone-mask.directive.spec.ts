import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PhoneMaskDirective } from './phone-mask.directive';
import { PhoneType } from '../../features/users/models/user.model';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, PhoneMaskDirective],
  template: `<input type="text" [formControl]="phone" [appPhoneMask]="type" />`,
})
class HostComponent {
  readonly phone = new FormControl('', { nonNullable: true });
  type: PhoneType = 'Celular';
}

describe('PhoneMaskDirective', () => {
  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    return { fixture, input };
  };

  it('deve formatar celular ao digitar e atualizar formControl', async () => {
    const { fixture, input } = await setup();

    input.value = '11987654321';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.value).toBe('(11) 9 8765-4321');
    expect(fixture.componentInstance.phone.value).toBe('(11) 9 8765-4321');
  });

  it('deve formatar fixo ao digitar e atualizar formControl', async () => {
    const { fixture, input } = await setup();

    fixture.componentInstance.type = 'Fixo';
    fixture.detectChanges();

    input.value = '1123456789';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.value).toBe('(11) 2345-6789');
    expect(fixture.componentInstance.phone.value).toBe('(11) 2345-6789');
  });

  it('deve reformatar automaticamente quando o tipo muda', async () => {
    const { fixture, input } = await setup();

    // Começa com Celular e com dígito "sobrando"
    input.value = '11234567890';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toBe('(11) 2 3456-7890');

    // Muda pra Fixo (deve cortar o último dígito de celular e reformatar)
    fixture.componentInstance.type = 'Fixo';
    fixture.detectChanges(); // Trigger ngOnChanges
    expect(input.value).toBe('(11) 2345-6789');
    expect(fixture.componentInstance.phone.value).toBe('(11) 2345-6789');
  });

  it('deve remover não-numéricos ao aplicar', async () => {
    const { fixture, input } = await setup();

    input.value = 'abc1198765-4321x';
    input.dispatchEvent(new Event('blur')); // testa o onBlur
    fixture.detectChanges();

    expect(input.value).toBe('(11) 9 8765-4321');
  });

  it('deve retornar silenciosamente se não houver ngControl', () => {
    TestBed.resetTestingModule();
    
    @Component({
      standalone: true,
      imports: [PhoneMaskDirective],
      template: `<input type="text" appPhoneMask="Celular" id="no-control" />`,
    })
    class NoControlHostComponent {}

    TestBed.configureTestingModule({ imports: [NoControlHostComponent] });
    const fixture = TestBed.createComponent(NoControlHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '11987654321';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Atualizou o valor visualmente sem explodir, mas não tem form control
    expect(input.value).toBe('(11) 9 8765-4321');
  });
});
