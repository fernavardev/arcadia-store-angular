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

  get controles(): { [key: string]: AbstractControl } {
    return this.registroForm.controls;
  }

  campoInvalido(nombreCampo: string): boolean {
    const control = this.registroForm.get(nombreCampo);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.enviado)
    );
  }

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

  limpiarFormulario(): void {
    this.limpiarCampos();
    this.registroExitoso = false;
    this.mensajeError = '';
  }

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