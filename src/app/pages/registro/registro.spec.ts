import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registro } from './registro';

describe('Registro', () => {
  let component: Registro;
  let fixture: ComponentFixture<Registro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registro],
    }).compileComponents();

    fixture = TestBed.createComponent(Registro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia rechazar una contrasena insegura', () => {
    const password = component.registroForm.get('password');

    password?.setValue('abc123');

    expect(password?.hasError('passwordSegura')).toBe(true);
  });

  it('deberia marcar error si las contrasenas no coinciden', () => {
    component.registroForm.get('password')?.setValue('Clave123*');
    component.registroForm.get('repetirPassword')?.setValue('Clave1234*');

    component.registroForm.updateValueAndValidity();

    expect(component.registroForm.hasError('passwordsNoCoinciden')).toBe(true);
  });
});
