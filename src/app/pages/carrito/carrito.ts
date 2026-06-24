import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cart } from '../../services/cart';

/**
 * @description
 * componente encargado de mostrar y modificar el carrito de compras
 */
@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  mensajeCompra = '';

  constructor(private cart: Cart) {}

  /**
   * @description
   * obtiene los productos actuales del carrito
   *
   * @returns lista de productos agregados al carrito
   */
  get carrito(): any[] {
    return this.cart.getCart();
  }

  /**
   * @description
   * obtiene el total actual de la compra
   *
   * @returns total calculado del carrito
   */
  get total(): number {
    return this.cart.getTotal();
  }

  /**
   * @description
   * aumenta la cantidad de un producto del carrito
   *
   * @param productId identificador del producto
   */
  aumentarCantidad(productId: number): void {
    this.cart.increaseQuantity(productId);
  }

  /**
   * @description
   * disminuye la cantidad de un producto del carrito
   *
   * @param productId identificador del producto
   */
  disminuirCantidad(productId: number): void {
    this.cart.decreaseQuantity(productId);
  }

  /**
   * @description
   * finaliza la compra simulada y muestra mensaje de confirmacion
   */
  finalizarCompra(): void {
    const compraRealizada = this.cart.finishPurchase();

    if (compraRealizada) {
      this.mensajeCompra = 'Compra realizada correctamente. Puedes revisarla en Mis compras.';
    }
  }
}