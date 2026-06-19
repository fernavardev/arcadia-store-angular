import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  usuarioActual: any = null;
  perfilForm: FormGroup;
  enviado = false;
  mensajeExito = false;
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth
  ) {
    this.usuarioActual = { ...this.auth.getCurrentUser() };

    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: [''],
    });

    if (this.usuarioActual) {
      this.perfilForm.patchValue({
        nombre: this.usuarioActual.nombre,
        usuario: this.usuarioActual.usuario,
        email: this.usuarioActual.email,
        direccion: this.usuarioActual.direccion || '',
      });
    }
  }

  get controles(): { [key: string]: AbstractControl } {
    return this.perfilForm.controls;
  }

  campoInvalido(nombreCampo: string): boolean {
    const control = this.perfilForm.get(nombreCampo);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.enviado)
    );
  }

  guardarCambios(): void {
    this.enviado = true;
    this.mensajeExito = false;
    this.mensajeError = '';

    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      this.mensajeError = 'Revisa los campos del perfil antes de guardar.';
      return;
    }

    const datos = this.perfilForm.getRawValue();

    const usuarioActualizado = {
      ...this.usuarioActual,
      nombre: datos.nombre,
      usuario: datos.usuario,
      email: datos.email,
      direccion: datos.direccion,
    };

    this.auth.updateCurrentUser(usuarioActualizado);
    this.usuarioActual = usuarioActualizado;
    this.mensajeExito = true;
    this.enviado = false;
  }

  limpiarFormulario(): void {
    this.perfilForm.reset({
      nombre: '',
      usuario: '',
      email: '',
      direccion: '',
    });

    this.enviado = false;
    this.mensajeExito = false;
    this.mensajeError = '';
  }
}