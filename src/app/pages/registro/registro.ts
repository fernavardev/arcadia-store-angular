import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  registrar() {
    this.registroExitoso = true;
  }

  limpiarFormulario() {
    this.nombre = '';
    this.usuario = '';
    this.correo = '';
    this.fechaNacimiento = '';
    this.password = '';
    this.repetirPassword = '';
    this.direccion = '';
    this.registroExitoso = false;
  }
}