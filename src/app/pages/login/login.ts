import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  correo = '';
  password = '';
  errorLogin = false;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  iniciarSesion() {
    const loginCorrecto = this.auth.login(this.correo, this.password);

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

  limpiarFormulario() {
    this.correo = '';
    this.password = '';
    this.errorLogin = false;
  }
}