import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CpfMaskDirective } from './cpf-mask.directive';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CpfMaskDirective],
  template: `<input type="text" [formControl]="cpf" appCpfMask />`,
})
class HostComponent {
  readonly cpf = new FormControl('', { nonNullable: true });
}

describe('CpfMaskDirective', () => {
  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    return { fixture, input };
  };

  it('deve formatar ao digitar e atualizar o formControl', async () => {
    const { fixture, input } = await setup();

    input.value = '52998224725';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.value).toBe('529.982.247-25');
    expect(fixture.componentInstance.cpf.value).toBe('529.982.247-25');
  });

  it('deve remover caracteres não numéricos e limitar em 11 dígitos', async () => {
    const { fixture, input } = await setup();

    input.value = 'abc529.982.247-251234';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.value).toBe('529.982.247-25');
    expect(fixture.componentInstance.cpf.value).toBe('529.982.247-25');
  });

  it('deve formatar parcialmente durante a digitação', async () => {
    const { fixture, input } = await setup();

    input.value = '1234';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.value).toBe('123.4');
    expect(fixture.componentInstance.cpf.value).toBe('123.4');
  });
});

