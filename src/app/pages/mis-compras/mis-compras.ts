import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-mis-compras',
  imports: [CommonModule],
  templateUrl: './mis-compras.html',
  styleUrl: './mis-compras.css',
})
export class MisCompras {

  constructor(private cart: Cart) {}

  get compras(): any[] {
    return this.cart.getPurchases();
  }
}