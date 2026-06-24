import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../services/cart';

/**
 * @description
 * componente encargado de mostrar el historial de compras del usuario
 */
@Component({
  selector: 'app-mis-compras',
  imports: [CommonModule],
  templateUrl: './mis-compras.html',
  styleUrl: './mis-compras.css',
})
export class MisCompras {

  constructor(private cart: Cart) {}

  /**
   * @description
   * obtiene las compras realizadas por el usuario actual
   *
   * @returns lista de compras del usuario
   */
  get compras(): any[] {
    return this.cart.getPurchases();
  }
}