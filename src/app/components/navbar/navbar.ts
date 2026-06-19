import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  get usuarioActual(): any {
    return this.auth.getCurrentUser();
  }

  get estaLogueado(): boolean {
    return this.auth.isLoggedIn();
  }

  get esAdmin(): boolean {
    return this.usuarioActual?.rol === 'admin';
  }

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}