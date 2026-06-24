import { Injectable } from '@angular/core';

/**
 * @description
 * servicio encargado de guardar y leer datos del navegador.
 */
@Injectable({
  providedIn: 'root',
})
export class Storage {

  /**
 * @description
 * guarda un dato en localstorage.
 *
 * @param key nombre del dato.
 * @param value valor que se desea guardar.
 */
  setLocal<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

/**
 * @description
 * obtiene un dato desde localstorage.
 *
 * @param key nombre del dato.
 * @returns dato encontrado o null si no existe.
 */
  getLocal<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

  /**
 * @description
 * elimina un dato de localstorage.
 *
 * @param key nombre del dato.
 */
  removeLocal(key: string): void {
    localStorage.removeItem(key);
  }

/**
 * @description
 * guarda un dato en sessionstorage.
 *
 * @param key nombre del dato.
 * @param value valor que se desea guardar.
 */
  setSession<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

/**
 * @description
 * obtiene un dato desde sessionstorage.
 *
 * @param key nombre del dato.
 * @returns dato encontrado o null si no existe.
 */
  getSession<T>(key: string): T | null {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

/**
 * @description
 * elimina un dato de sessionstorage.
 *
 * @param key nombre del dato.
 */
  removeSession(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
 * @description
 * limpia todos los datos guardados en sessionstorage.
 */
  clearSession(): void {
    sessionStorage.clear();
  }
}