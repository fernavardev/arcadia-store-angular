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
import { Auth } from '../../services/auth';

/**
 * @description
 * componente encargado del registro de nuevos usuarios
 */
@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  registroForm: FormGroup;
  enviado = false;
  registroExitoso = false;
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth
  ) {
    this.registroForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        usuario: ['', [Validators.required, Validators.minLength(3)]],
        correo: ['', [Validators.required, Validators.email]],
        fechaNacimiento: ['', [Validators.required, edadMinimaValidator(13)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
            passwordSeguraValidator(),
          ],
        ],
        repetirPassword: ['', [Validators.required]],
        direccion: [''],
      },
      {
        validators: [passwordsIgualesValidator('password', 'repetirPassword')],
      }
    );
  }

  /**
   * @description
   * entrega acceso rapido a los controles del formulario
   *
   * @returns controles del formulario de registro
   */
  get controles(): { [key: string]: AbstractControl } {
    return this.registroForm.controls;
  }

  /**
   * @description
   * verifica si un campo debe mostrar error de validacion
   *
   * @param nombreCampo nombre del campo que se desea revisar
   * @returns true si el campo es invalido, false en caso contrario
   */
  campoInvalido(nombreCampo: string): boolean {
    const control = this.registroForm.get(nombreCampo);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.enviado)
    );
  }

  /**
   * @description
   * valida el formulario y registra un nuevo usuario cliente
   */
  registrar(): void {
    this.enviado = true;
    this.registroExitoso = false;
    this.mensajeError = '';

    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      this.mensajeError = 'Revisa los campos del formulario antes de registrarte.';
      return;
    }

    const datos = this.registroForm.getRawValue();

    const nuevoUsuario = {
      id: Date.now(),
      nombre: datos.nombre,
      usuario: datos.usuario,
      email: datos.correo,
      fechaNacimiento: datos.fechaNacimiento,
      password: datos.password,
      direccion: datos.direccion,
      rol: 'cliente',
    };

    this.auth.register(nuevoUsuario);
    this.registroExitoso = true;
    this.limpiarCampos();
  }

  /**
   * @description
   * limpia el formulario y reinicia los mensajes visibles
   */
  limpiarFormulario(): void {
    this.limpiarCampos();
    this.registroExitoso = false;
    this.mensajeError = '';
  }

  /**
   * @description
   * reinicia los campos del formulario de registro
   */
  private limpiarCampos(): void {
    this.registroForm.reset({
      nombre: '',
      usuario: '',
      correo: '',
      fechaNacimiento: '',
      password: '',
      repetirPassword: '',
      direccion: '',
    });

    this.enviado = false;
  }
}

/**
 * @description
 * valida que la contrasena cumpla reglas basicas de seguridad
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
    const tieneNumero = /\d/.test(valor);
    const tieneEspecial = /[!@#$%&*._-]/.test(valor);

    return tieneMayuscula && tieneNumero && tieneEspecial
      ? null
      : {
          passwordSegura: {
            mayuscula: tieneMayuscula,
            numero: tieneNumero,
            especial: tieneEspecial,
          },
        };
  };
}

/**
 * @description
 * valida que la fecha de nacimiento cumpla con una edad minima
 *
 * @param edadMinima edad minima requerida
 * @returns validador para edad minima
 */
function edadMinimaValidator(edadMinima: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaNacimiento = control.value;

    if (!fechaNacimiento) {
      return null;
    }

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);

    if (Number.isNaN(nacimiento.getTime())) {
      return { fechaInvalida: true };
    }

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad >= edadMinima ? null : { edadMinima: true };
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