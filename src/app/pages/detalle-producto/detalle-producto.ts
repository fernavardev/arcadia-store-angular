import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PRODUCTOS, Producto } from '../../data/productos';

@Component({
  selector: 'app-detalle-producto',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css',
})
export class DetalleProducto {

  producto?: Producto;
  rutaRetorno = '/';

  constructor(private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.producto = PRODUCTOS.find(producto => producto.id === id);

    if (this.producto) {
      this.rutaRetorno =
        '/catalogo/' +
        this.producto.categoria.toLowerCase();
    }
    
  }
}