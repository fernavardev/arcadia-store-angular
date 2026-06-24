import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Storage } from '../../services/storage';

/**
 * @description
 * componente encargado de mostrar usuarios y asignar rol administrador
 */
@Component({
  selector: 'app-admin-usuarios',
  imports: [CommonModule],
  templateUrl: './admin-usuarios.html',
  styleUrl: './admin-usuarios.css',
})
export class AdminUsuarios {
  constructor(private storage: Storage) {}

  /**
   * @description
   * obtiene los usuarios registrados en el almacenamiento local
   *
   * @returns lista de usuarios registrados
   */
  get usuarios(): any[] {
    return this.storage.getLocal<any[]>('users') || [];
  }

  /**
   * @description
   * cambia el rol de un usuario cliente a administrador
   *
   * @param idUsuario identificador del usuario que sera actualizado
   */
  convertirEnAdmin(idUsuario: number): void {
    const usuarios = this.storage.getLocal<any[]>('users') || [];

    const usuariosActualizados = usuarios.map((usuario) =>
      usuario.id === idUsuario
        ? { ...usuario, rol: 'admin' }
        : usuario
    );

    this.storage.setLocal('users', usuariosActualizados);
  }
}