import { Injectable } from '@angular/core';
import { Storage } from './storage';
import { Auth } from './auth';

/**
 * @description
 * servicio encargado de manejar el carrito y las compras del usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class Cart {

  private cartKey = 'cart';
  private purchasesKey = 'compras';

  constructor(
    private storage: Storage,
    private auth: Auth
  ) {}

  /**
 * @description
 * obtiene los productos del carrito asociados al usuario actual.
 *
 * @returns lista de productos del carrito.
 */
  getCart(): any[] {
    const currentUser = this.auth.getCurrentUser();
    const cart = this.storage.getLocal<any[]>(this.cartKey) || [];

    if (!currentUser) {
      return [];
    }

    return cart.filter((item) => item.userEmail === currentUser.email);
  }

  /**
 * @description
 * agrega un producto al carrito del usuario actual.
 *
 * @param product producto que se desea agregar.
 */
  addToCart(product: any): void {
    const currentUser = this.auth.getCurrentUser();

    if (!currentUser) {
      return;
    }

    const cart = this.storage.getLocal<any[]>(this.cartKey) || [];

    const existingProduct = cart.find(
      (item) => item.productId === product.id && item.userEmail === currentUser.email
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: Date.now(),
        userEmail: currentUser.email,
        productId: product.id,
        nombre: product.nombre,
        precio: product.precio,
        quantity: 1,
      });
    }

    this.storage.setLocal(this.cartKey, cart);
  }

/**
 * @description
 * aumenta la cantidad de un producto dentro del carrito.
 *
 * @param productId identificador del producto.
 */
  increaseQuantity(productId: number): void {
    const currentUser = this.auth.getCurrentUser();
    const cart = this.storage.getLocal<any[]>(this.cartKey) || [];

    const item = cart.find(
      (product) => product.productId === productId && product.userEmail === currentUser?.email
    );

    if (item) {
      item.quantity += 1;
      this.storage.setLocal(this.cartKey, cart);
    }
  }

  /**
 * @description
 * disminuye la cantidad de un producto dentro del carrito.
 *
 * @param productId identificador del producto.
 */
  decreaseQuantity(productId: number): void {
    const currentUser = this.auth.getCurrentUser();
    let cart = this.storage.getLocal<any[]>(this.cartKey) || [];

    const item = cart.find(
      (product) => product.productId === productId && product.userEmail === currentUser?.email
    );

    if (!item) {
      return;
    }

    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart = cart.filter(
        (product) =>
          !(product.productId === productId && product.userEmail === currentUser?.email)
      );
    }

    this.storage.setLocal(this.cartKey, cart);
  }

  /**
 * @description
 * calcula el total actual del carrito.
 *
 * @returns total de la compra.
 */
  getTotal(): number {
    return this.getCart().reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    );
  }

  /**
 * @description
 * finaliza la compra y guarda el historial del usuario.
 *
 * @returns true si la compra se completa, false si no es posible realizarla.
 */
  finishPurchase(): boolean {
    const currentUser = this.auth.getCurrentUser();

    if (!currentUser) {
      return false;
    }

    const fullCart = this.storage.getLocal<any[]>(this.cartKey) || [];
    const userCart = this.getCart();

    if (userCart.length === 0) {
      return false;
    }

    const purchases = this.storage.getLocal<any[]>(this.purchasesKey) || [];

    purchases.push({
      id: Date.now(),
      userEmail: currentUser.email,
      fecha: new Date().toLocaleDateString('es-CL'),
      productos: userCart,
      total: this.getTotal(),
    });

    this.storage.setLocal(this.purchasesKey, purchases);

    const updatedCart = fullCart.filter(
      (item) => item.userEmail !== currentUser.email
    );

    this.storage.setLocal(this.cartKey, updatedCart);

    return true;
  }

  /**
 * @description
 * obtiene las compras realizadas por el usuario actual.
 *
 * @returns lista de compras del usuario.
 */
  getPurchases(): any[] {
    const currentUser = this.auth.getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const purchases = this.storage.getLocal<any[]>(this.purchasesKey) || [];

    return purchases.filter(
      (purchase) => purchase.userEmail === currentUser.email
    );
  }
}