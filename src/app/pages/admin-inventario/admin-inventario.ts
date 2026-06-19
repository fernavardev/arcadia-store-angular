import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product';

@Component({
  selector: 'app-admin-inventario',
  imports: [CommonModule],
  templateUrl: './admin-inventario.html',
  styleUrl: './admin-inventario.css',
})
export class AdminInventario {
  constructor(private product: Product) {}

  get productos(): any[] {
    return this.product.getProducts();
  }

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