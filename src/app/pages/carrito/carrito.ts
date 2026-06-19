import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  mensajeCompra = '';

  constructor(private cart: Cart) {}

  get carrito(): any[] {
    return this.cart.getCart();
  }

  get total(): number {
    return this.cart.getTotal();
  }

  aumentarCantidad(productId: number): void {
    this.cart.increaseQuantity(productId);
  }

  disminuirCantidad(productId: number): void {
    this.cart.decreaseQuantity(productId);
  }

  finalizarCompra(): void {
    const compraRealizada = this.cart.finishPurchase();

    if (compraRealizada) {
      this.mensajeCompra = 'Compra realizada correctamente. Puedes revisarla en Mis compras.';
    }
  }
}