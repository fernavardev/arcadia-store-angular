import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  nombre = '';
  usuario = '';
  correo = '';
  fechaNacimiento = '';
  password = '';
  repetirPassword = '';
  direccion = '';

  registroExitoso = false;

  constructor(private auth: Auth) {}

  registrar() {
    const nuevoUsuario = {
      id: Date.now(),
      nombre: this.nombre,
      usuario: this.usuario,
      email: this.correo,
      fechaNacimiento: this.fechaNacimiento,
      password: this.password,
      direccion: this.direccion,
      rol: 'cliente',
    };

    this.auth.register(nuevoUsuario);
    this.registroExitoso = true;
    this.limpiarCampos();
  }

  limpiarFormulario() {
    this.limpiarCampos();
    this.registroExitoso = false;
  }

  private limpiarCampos() {
    this.nombre = '';
    this.usuario = '';
    this.correo = '';
    this.fechaNacimiento = '';
    this.password = '';
    this.repetirPassword = '';
    this.direccion = '';
  }
}