import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Storage } from '../../services/storage';

@Component({
  selector: 'app-admin-usuarios',
  imports: [CommonModule],
  templateUrl: './admin-usuarios.html',
  styleUrl: './admin-usuarios.css',
})
export class AdminUsuarios {
  constructor(private storage: Storage) {}

  get usuarios(): any[] {
    return this.storage.getLocal<any[]>('users') || [];
  }

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