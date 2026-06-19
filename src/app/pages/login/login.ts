import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  enviado = false;
  errorLogin = false;
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get controles(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  campoInvalido(nombreCampo: string): boolean {
    const control = this.loginForm.get(nombreCampo);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.enviado)
    );
  }

  iniciarSesion(): void {
    this.enviado = true;
    this.errorLogin = false;
    this.mensajeError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.mensajeError = 'Ingresa un correo válido y una contraseña.';
      return;
    }

    const { correo, password } = this.loginForm.getRawValue();

    const loginCorrecto = this.auth.login(correo, password);

    if (!loginCorrecto) {
      this.errorLogin = true;
      return;
    }

    const usuarioActual = this.auth.getCurrentUser();

    if (usuarioActual?.rol === 'admin') {
      this.router.navigate(['/admin/productos']);
    } else {
      this.router.navigate(['/perfil']);
    }
  }

  limpiarFormulario(): void {
    this.loginForm.reset({
      correo: '',
      password: '',
    });

    this.enviado = false;
    this.errorLogin = false;
    this.mensajeError = '';
  }
}