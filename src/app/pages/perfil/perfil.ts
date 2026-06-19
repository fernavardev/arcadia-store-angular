import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  usuarioActual: any = null;
  mensajeExito = false;

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.usuarioActual = { ...this.auth.getCurrentUser() };
  }

  guardarCambios() {
    this.auth.updateCurrentUser(this.usuarioActual);
    this.mensajeExito = true;
  }

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}