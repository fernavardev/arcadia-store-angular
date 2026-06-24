import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

/**
 * @description
 * componente encargado de mostrar el menu principal de navegacion
 */
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

  /**
   * @description
   * obtiene el usuario con sesion activa
   *
   * @returns usuario actual o null si no existe sesion
   */
  get usuarioActual(): any {
    return this.auth.getCurrentUser();
  }

  /**
   * @description
   * verifica si existe una sesion activa
   *
   * @returns true si el usuario esta logueado, false en caso contrario
   */
  get estaLogueado(): boolean {
    return this.auth.isLoggedIn();
  }

  /**
   * @description
   * verifica si el usuario actual tiene rol administrador
   *
   * @returns true si el usuario es administrador, false en caso contrario
   */
  get esAdmin(): boolean {
    return this.usuarioActual?.rol === 'admin';
  }

  /**
   * @description
   * cierra la sesion actual y redirige al login
   */
  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}