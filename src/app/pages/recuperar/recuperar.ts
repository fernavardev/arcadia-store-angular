import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Storage } from '../../services/storage';

/**
 * @description
 * componente encargado de simular la recuperacion de contrasena
 */
@Component({
  selector: 'app-recuperar',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recuperar.html',
  styleUrl: './recuperar.css',
})
export class Recuperar {
  recuperarForm: FormGroup;
  usuarioRecuperado: any = null;
  enviado = false;
  mensaje = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private storage: Storage
  ) {
    this.recuperarForm = this.fb.group(
      {
        correo: ['', [Validators.required, Validators.email]],
        nuevaPassword: [
          '',
          [
            Validators.minLength(6),
            Validators.maxLength(18),
            passwordSeguraValidator(),
          ],
        ],
        repetirNuevaPassword: [''],
      },
      {
        validators: [passwordsIgualesValidator('nuevaPassword', 'repetirNuevaPassword')],
      }
    );
  }

  /**
   * @description
   * entrega acceso rapido a los controles del formulario
   *
   * @returns controles del formulario de recuperacion
   */
  get controles(): { [key: string]: AbstractControl } {
    return this.recuperarForm.controls;
  }

  /**
   * @description
   * verifica si un campo debe mostrar error de validacion
   *
   * @param nombreCampo nombre del campo que se desea revisar
   * @returns true si el campo es invalido, false en caso contrario
   */
  campoInvalido(nombreCampo: string): boolean {
    const control = this.recuperarForm.get(nombreCampo);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.enviado)
    );
  }

  /**
   * @description
   * busca la cuenta por correo y permite actualizar la contrasena
   */
  recuperarPassword(): void {
    this.enviado = true;
    this.error = '';
    this.mensaje = '';

    const users = this.storage.getLocal<any[]>('users') || [];

    if (!this.usuarioRecuperado) {
      const correoControl = this.recuperarForm.get('correo');

      if (correoControl?.invalid) {
        correoControl.markAsTouched();
        this.error = 'Ingresa un correo válido.';
        return;
      }

      const correo = correoControl?.value.trim();

      this.usuarioRecuperado = users.find((user) => user.email === correo);

      if (!this.usuarioRecuperado) {
        this.error = 'No existe una cuenta registrada con este correo.';
        return;
      }

      this.recuperarForm.get('correo')?.disable();

      this.recuperarForm.get('nuevaPassword')?.setValidators([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        passwordSeguraValidator(),
      ]);

      this.recuperarForm.get('repetirNuevaPassword')?.setValidators([
        Validators.required,
      ]);

      this.recuperarForm.get('nuevaPassword')?.updateValueAndValidity();
      this.recuperarForm.get('repetirNuevaPassword')?.updateValueAndValidity();

      this.enviado = false;
      this.mensaje = 'Cuenta encontrada. Ingresa una nueva contraseña.';
      return;
    }

    if (this.recuperarForm.invalid) {
      this.recuperarForm.markAllAsTouched();
      this.error = 'Revisa la nueva contraseña antes de continuar.';
      return;
    }

    const { nuevaPassword } = this.recuperarForm.getRawValue();

    const updatedUsers = users.map((user) =>
      user.email === this.usuarioRecuperado.email
        ? { ...user, password: nuevaPassword }
        : user
    );

    this.storage.setLocal('users', updatedUsers);

    this.mensaje = 'Contraseña actualizada correctamente. Ya puedes iniciar sesión.';
    this.limpiarCampos();
  }

  /**
   * @description
   * limpia el formulario y vuelve al estado inicial
   */
  limpiarFormulario(): void {
    this.recuperarForm.get('correo')?.enable();

    this.recuperarForm.reset({
      correo: '',
      nuevaPassword: '',
      repetirNuevaPassword: '',
    });

    this.usuarioRecuperado = null;
    this.enviado = false;
    this.mensaje = '';
    this.error = '';

    this.recuperarForm.get('nuevaPassword')?.clearValidators();
    this.recuperarForm.get('repetirNuevaPassword')?.clearValidators();

    this.recuperarForm.get('nuevaPassword')?.updateValueAndValidity();
    this.recuperarForm.get('repetirNuevaPassword')?.updateValueAndValidity();
  }

  /**
   * @description
   * reinicia los campos luego de actualizar la contrasena
   */
  private limpiarCampos(): void {
    this.recuperarForm.get('correo')?.enable();

    this.recuperarForm.reset({
      correo: '',
      nuevaPassword: '',
      repetirNuevaPassword: '',
    });

    this.usuarioRecuperado = null;
    this.enviado = false;

    this.recuperarForm.get('nuevaPassword')?.clearValidators();
    this.recuperarForm.get('repetirNuevaPassword')?.clearValidators();

    this.recuperarForm.get('nuevaPassword')?.updateValueAndValidity();
    this.recuperarForm.get('repetirNuevaPassword')?.updateValueAndValidity();
  }
}

/**
 * @description
 * valida que la nueva contrasena cumpla reglas basicas de seguridad
 *
 * @returns validador para contrasena segura
 */
function passwordSeguraValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value || '';

    if (!valor) {
      return null;
    }

    const tieneMayuscula = /[A-Z]/.test(valor);
    const tieneMinuscula = /[a-z]/.test(valor);
    const tieneNumero = /\d/.test(valor);

    return tieneMayuscula && tieneMinuscula && tieneNumero
      ? null
      : {
          passwordSegura: true,
        };
  };
}

/**
 * @description
 * valida que dos campos de contrasena tengan el mismo valor
 *
 * @param campoPassword nombre del campo de contrasena
 * @param campoRepetirPassword nombre del campo de confirmacion
 * @returns validador para comparar contrasenas
 */
function passwordsIgualesValidator(
  campoPassword: string,
  campoRepetirPassword: string
): ValidatorFn {
  return (formulario: AbstractControl): ValidationErrors | null => {
    const password = formulario.get(campoPassword)?.value;
    const repetirPassword = formulario.get(campoRepetirPassword)?.value;

    if (!password || !repetirPassword) {
      return null;
    }

    return password === repetirPassword ? null : { passwordsNoCoinciden: true };
  };
}