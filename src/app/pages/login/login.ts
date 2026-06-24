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

/**
 * @description
 * componente encargado del inicio de sesion de usuarios
 */
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

  /**
   * @description
   * entrega acceso rapido a los controles del formulario
   *
   * @returns controles del formulario de login
   */
  get controles(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  /**
   * @description
   * verifica si un campo debe mostrar error de validacion
   *
   * @param nombreCampo nombre del campo que se desea revisar
   * @returns true si el campo es invalido, false en caso contrario
   */
  campoInvalido(nombreCampo: string): boolean {
    const control = this.loginForm.get(nombreCampo);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.enviado)
    );
  }

  /**
   * @description
   * valida el formulario e intenta iniciar sesion segun las credenciales ingresadas
   */
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

  /**
   * @description
   * limpia el formulario y reinicia los mensajes de error
   */
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