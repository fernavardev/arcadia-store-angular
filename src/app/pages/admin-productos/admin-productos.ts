import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../services/product';

/**
 * @description
 * componente encargado de registrar productos desde el panel administrador
 */
@Component({
  selector: 'app-admin-productos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-productos.html',
  styleUrl: './admin-productos.css',
})
export class AdminProductos {
  productoForm: FormGroup;
  enviado = false;

  mensajeProducto = '';
  errorProducto = '';

  constructor(
    private fb: FormBuilder,
    private product: Product
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: [null, [Validators.required, Validators.min(1)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      descuento: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      imagen: [''],
    });
  }

  /**
   * @description
   * obtiene los productos registrados para mostrarlos en la tabla
   *
   * @returns lista de productos registrados
   */
  get productos(): any[] {
    return this.product.getProducts();
  }

  /**
   * @description
   * entrega acceso rapido a los controles del formulario
   *
   * @returns controles del formulario de productos
   */
  get controles(): { [key: string]: AbstractControl } {
    return this.productoForm.controls;
  }

  /**
   * @description
   * verifica si un campo debe mostrar error de validacion
   *
   * @param nombreCampo nombre del campo que se desea revisar
   * @returns true si el campo es invalido, false en caso contrario
   */
  campoInvalido(nombreCampo: string): boolean {
    const control = this.productoForm.get(nombreCampo);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.enviado)
    );
  }

  /**
   * @description
   * valida el formulario y registra un nuevo producto en el catalogo
   */
  guardarProducto(): void {
    this.enviado = true;
    this.mensajeProducto = '';
    this.errorProducto = '';

    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      this.errorProducto = 'Completa correctamente los campos obligatorios.';
      return;
    }

    const datos = this.productoForm.getRawValue();

    this.product.addProduct({
      nombre: datos.nombre.trim(),
      categoria: datos.categoria,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      descuento: Number(datos.descuento) || 0,
      imagen: datos.imagen.trim() || '/img/juegos/default.png',
      descripcion: datos.descripcion.trim(),
    });

    this.mensajeProducto = 'Producto registrado correctamente.';
    this.limpiarFormulario(false);
  }

  /**
   * @description
   * limpia el formulario de productos y opcionalmente los mensajes visibles
   *
   * @param limpiarMensajes indica si se deben limpiar los mensajes del formulario
   */
  limpiarFormulario(limpiarMensajes = true): void {
    this.productoForm.reset({
      nombre: '',
      categoria: '',
      descripcion: '',
      precio: null,
      stock: null,
      descuento: 0,
      imagen: '',
    });

    this.enviado = false;

    if (limpiarMensajes) {
      this.mensajeProducto = '';
      this.errorProducto = '';
    }
  }
}