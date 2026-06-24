import { Injectable } from '@angular/core';
import { PRODUCTOS } from '../data/productos';
import { Storage } from './storage';

/**
 * @description
 * servicio encargado de manejar el catalogo de productos.
 */
@Injectable({
  providedIn: 'root',
})
export class Product {
  private storageKey = 'products';

  constructor(private storage: Storage) {
    this.initializeProducts();
  }

/**
 * @description
 * carga los productos iniciales si aun no existen en el almacenamiento local.
 */
  initializeProducts(): void {
    const products = this.storage.getLocal<any[]>(this.storageKey);

    if (!products) {
      this.storage.setLocal(this.storageKey, PRODUCTOS);
    }
  }

/**
 * @description
 * obtiene todos los productos disponibles.
 *
 * @returns lista de productos.
 */
  getProducts(): any[] {
    return this.storage.getLocal<any[]>(this.storageKey) || [];
  }

/**
 * @description
 * agrega un nuevo producto al catalogo.
 *
 * @param product datos del producto que se desea agregar.
 */
  addProduct(product: any): void {
    const products = this.getProducts();

    const newProduct = {
      ...product,
      id: Date.now(),
    };

    products.push(newProduct);
    this.storage.setLocal(this.storageKey, products);
  }

  /**
 * @description
 * busca un producto segun su identificador.
 *
 * @param id identificador del producto.
 * @returns producto encontrado o undefined si no existe.
 */
  getProductById(id: number): any | undefined {
    return this.getProducts().find((product) => product.id === id);
  }

  /**
 * @description
 * obtiene productos filtrados por categoria.
 *
 * @param category categoria seleccionada.
 * @returns lista de productos de la categoria indicada.
 */
  getProductsByCategory(category: string): any[] {
    return this.getProducts().filter(
      (product) => product.categoria.toLowerCase() === category.toLowerCase()
    );
  }
}