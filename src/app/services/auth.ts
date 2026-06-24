import { Injectable } from '@angular/core';
import { Storage } from './storage';
import { USUARIOS_INICIALES } from '../data/usuarios';

/**
 * @description
 * servicio encargado de manejar usuarios, inicio de sesion y sesion activa.
 */
@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(private storage: Storage) {
    this.initializeUsers();
  }

/**
 * @description
 * carga los usuarios iniciales si aun no existen en el almacenamiento local.
 */
  initializeUsers(): void {
    const users = this.storage.getLocal<any[]>('users') || [];

    const usersWithAdmins = [...users];

    USUARIOS_INICIALES.forEach((admin) => {
      const adminExists = usersWithAdmins.some(
        (user) => user.email === admin.email
      );

      if (!adminExists) {
        usersWithAdmins.push(admin);
      }
    });

    this.storage.setLocal('users', usersWithAdmins);
  }

/**
 * @description
 * registra un nuevo usuario en el almacenamiento local.
 *
 * @param user datos del usuario que se desea registrar.
 */
  register(user: any): void {
    const users = this.storage.getLocal<any[]>('users') || [];
    users.push(user);
    this.storage.setLocal('users', users);
  }

/**
 * @description
 * valida las credenciales del usuario y guarda la sesion activa.
 *
 * @param email correo ingresado por el usuario.
 * @param password contrasena ingresada por el usuario.
 * @returns true si el inicio de sesion es correcto, false en caso contrario.
 */
  login(email: string, password: string): boolean {
    const users = this.storage.getLocal<any[]>('users') || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.storage.setSession('currentUser', user);
      return true;
    }

    return false;
  }

/**
 * @description
 * cierra la sesion activa del usuario.
 */
  logout(): void {
    this.storage.removeSession('currentUser');
  }

/**
 * @description
 * obtiene el usuario que mantiene una sesion activa.
 *
 * @returns usuario actual o null si no existe sesion.
 */
  getCurrentUser(): any {
    return this.storage.getSession('currentUser');
  }

/**
 * @description
 * verifica si existe un usuario con sesion activa.
 *
 * @returns true si hay sesion activa, false en caso contrario.
 */
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
  
/**
 * @description
 * actualiza los datos del usuario actual en localstorage y sessionstorage.
 *
 * @param updatedUser datos actualizados del usuario.
 */
  updateCurrentUser(updatedUser: any): void {
    const users = this.storage.getLocal<any[]>('users') || [];

    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    this.storage.setLocal('users', updatedUsers);
    this.storage.setSession('currentUser', updatedUser);
  }
}