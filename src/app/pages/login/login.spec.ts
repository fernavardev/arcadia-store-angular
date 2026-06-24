import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia iniciar con formulario invalido si los campos estan vacios', () => {
    expect(component.loginForm.invalid).toBe(true);
  });

  it('deberia rechazar un correo con formato incorrecto', () => {
    const correo = component.loginForm.get('correo');

    correo?.setValue('correo-malo');

    expect(correo?.invalid).toBe(true);
  });
});
