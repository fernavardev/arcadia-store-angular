import { Injectable } from '@angular/core';
import { PRODUCTOS } from '../data/productos';
import { Storage } from './storage';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private storageKey = 'products';

  constructor(private storage: Storage) {
    this.initializeProducts();
  }

  initializeProducts(): void {
    const products = this.storage.getLocal<any[]>(this.storageKey);

    if (!products) {
      this.storage.setLocal(this.storageKey, PRODUCTOS);
    }
  }

  getProducts(): any[] {
    return this.storage.getLocal<any[]>(this.storageKey) || [];
  }

  addProduct(product: any): void {
    const products = this.getProducts();

    const newProduct = {
      ...product,
      id: Date.now(),
    };

    products.push(newProduct);
    this.storage.setLocal(this.storageKey, products);
  }

  getProductById(id: number): any | undefined {
    return this.getProducts().find((product) => product.id === id);
  }

  getProductsByCategory(category: string): any[] {
    return this.getProducts().filter(
      (product) => product.categoria.toLowerCase() === category.toLowerCase()
    );
  }
}