import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../services/product';

@Component({
  selector: 'app-admin-productos',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-productos.html',
  styleUrl: './admin-productos.css',
})
export class AdminProductos {
  nombre = '';
  categoria = '';
  precio: number | null = null;
  stock: number | null = null;
  descuento: number | null = 0;
  imagen = '';

  mensajeProducto = '';
  errorProducto = '';

  constructor(private product: Product) {}

  get productos(): any[] {
    return this.product.getProducts();
  }

  guardarProducto(): void {
    this.mensajeProducto = '';
    this.errorProducto = '';

    if (
      this.nombre.trim() === '' ||
      this.categoria === '' ||
      !this.precio ||
      this.precio <= 0 ||
      this.stock === null ||
      this.stock < 0
    ) {
      this.errorProducto = 'Completa correctamente los campos obligatorios.';
      return;
    }

    if (
      this.descuento !== null &&
      (this.descuento < 0 || this.descuento > 100)
    ) {
      this.errorProducto = 'El descuento debe estar entre 0 y 100.';
      return;
    }

    this.product.addProduct({
      nombre: this.nombre.trim(),
      categoria: this.categoria,
      precio: this.precio,
      stock: this.stock,
      descuento: this.descuento || 0,
      imagen: this.imagen.trim() || '/img/juegos/default.png',
      descripcion: 'Producto agregado desde el panel de administración.',
    });

    this.mensajeProducto = 'Producto registrado correctamente.';
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.nombre = '';
    this.categoria = '';
    this.precio = null;
    this.stock = null;
    this.descuento = 0;
    this.imagen = '';
  }
}