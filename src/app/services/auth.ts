import { Injectable } from '@angular/core';
import { Storage } from './storage';
import { USUARIOS_INICIALES } from '../data/usuarios';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(private storage: Storage) {
    this.initializeUsers();
  }

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

  register(user: any): void {
    const users = this.storage.getLocal<any[]>('users') || [];
    users.push(user);
    this.storage.setLocal('users', users);
  }

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

  logout(): void {
    this.storage.removeSession('currentUser');
  }

  getCurrentUser(): any {
    return this.storage.getSession('currentUser');
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
  
  updateCurrentUser(updatedUser: any): void {
    const users = this.storage.getLocal<any[]>('users') || [];

    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    this.storage.setLocal('users', updatedUsers);
    this.storage.setSession('currentUser', updatedUser);
  }
}