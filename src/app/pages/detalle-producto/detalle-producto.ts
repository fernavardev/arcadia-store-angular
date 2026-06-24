import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../services/product';
import { Cart } from '../../services/cart';
import { Auth } from '../../services/auth';

/**
 * @description
 * componente encargado de mostrar el detalle de un producto
 */
@Component({
  selector: 'app-detalle-producto',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css',
})
export class DetalleProducto {
  producto?: any;
  rutaRetorno = '/';
  mensajeCarrito = '';

  /**
   * @description
   * obtiene el producto seleccionado usando el id recibido por ruta
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private product: Product,
    private cart: Cart,
    private auth: Auth
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.producto = this.product.getProductById(id);

    if (this.producto) {
      this.rutaRetorno = '/catalogo/' + this.producto.categoria.toLowerCase();
    }
  }

  /**
   * @description
   * agrega el producto actual al carrito si el usuario tiene sesion de cliente
   */
  agregarAlCarrito() {
    if (!this.auth.isLoggedIn() || this.auth.getCurrentUser()?.rol !== 'cliente') {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.producto || this.producto.stock <= 0) {
      return;
    }

    this.cart.addToCart(this.producto);
    this.router.navigate(['/carrito']);
  }
}