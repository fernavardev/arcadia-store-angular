import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product';

/**
 * @description
 * componente encargado de mostrar el inventario de productos
 */
@Component({
  selector: 'app-admin-inventario',
  imports: [CommonModule],
  templateUrl: './admin-inventario.html',
  styleUrl: './admin-inventario.css',
})
export class AdminInventario {
  constructor(private product: Product) {}

  /**
   * @description
   * obtiene los productos registrados para mostrarlos en inventario
   *
   * @returns lista de productos registrados
   */
  get productos(): any[] {
    return this.product.getProducts();
  }

  /**
   * @description
   * obtiene el estado del producto segun su cantidad disponible
   *
   * @param stock cantidad disponible del producto
   * @returns texto con el estado del stock
   */
  obtenerEstado(stock: number): string {
    if (stock === 0) {
      return 'Sin stock';
    }

    if (stock <= 3) {
      return 'Stock bajo';
    }

    return 'Disponible';
  }
}