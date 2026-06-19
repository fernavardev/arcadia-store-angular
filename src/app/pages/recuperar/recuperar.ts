import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '../../services/storage';

@Component({
  selector: 'app-recuperar',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recuperar.html',
  styleUrl: './recuperar.css',
})
export class Recuperar {
  correo = '';
  nuevaPassword = '';
  repetirNuevaPassword = '';
  usuarioRecuperado: any = null;
  mensaje = '';
  error = '';

  constructor(private storage: Storage) {}

  recuperarPassword() {
    this.error = '';
    this.mensaje = '';

    const users = this.storage.getLocal<any[]>('users') || [];

    if (!this.usuarioRecuperado) {
      this.usuarioRecuperado = users.find((user) => user.email === this.correo.trim());

      if (!this.usuarioRecuperado) {
        this.error = 'No existe una cuenta registrada con este correo.';
        return;
      }

      this.mensaje = 'Cuenta encontrada. Ingresa una nueva contraseña.';
      return;
    }

    const password = this.nuevaPassword;
    const validaPassword =
      password.length >= 6 &&
      password.length <= 18 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password);

    if (!validaPassword) {
      this.error = 'La contraseña debe tener entre 6 y 18 caracteres, mayúscula, minúscula y número.';
      return;
    }

    if (this.nuevaPassword !== this.repetirNuevaPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    const updatedUsers = users.map((user) =>
      user.email === this.usuarioRecuperado.email
        ? { ...user, password: this.nuevaPassword }
        : user
    );

    this.storage.setLocal('users', updatedUsers);

    this.mensaje = 'Contraseña actualizada correctamente. Ya puedes iniciar sesión.';
    this.limpiarCampos();
  }

  limpiarFormulario() {
    this.correo = '';
    this.limpiarCampos();
    this.mensaje = '';
    this.error = '';
  }

  private limpiarCampos() {
    this.nuevaPassword = '';
    this.repetirNuevaPassword = '';
    this.usuarioRecuperado = null;
  }
}