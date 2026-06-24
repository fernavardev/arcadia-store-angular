import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../services/product';

/**
 * @description
 * componente encargado de mostrar el catalogo de productos
 */
@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  productos: any[] = [];
  categoriaSeleccionada: string | null = null;

  ordenCategorias = ['estrategia', 'familiares', 'cartas', 'cooperativos'];
  categoriaAnterior = '';
  categoriaSiguiente = '';

  titulosCategoria: Record<string, { titulo: string; descripcion: string }> = {
    estrategia: {
      titulo: 'Juegos de estrategia',
      descripcion: 'Opciones ideales para quienes disfrutan planificar y competir.',
    },
    familiares: {
      titulo: 'Juegos familiares',
      descripcion: 'Juegos simples, entretenidos y pensados para todas las edades.',
    },
    cartas: {
      titulo: 'Juegos de cartas',
      descripcion: 'Alternativas rápidas, compactas y entretenidas para cualquier ocasión.',
    },
    cooperativos: {
      titulo: 'Juegos cooperativos',
      descripcion: 'Juegos donde la comunicación y el trabajo en equipo son fundamentales.',
    },
  };

  infoCategoria = {
    titulo: 'Catálogo de juegos',
    descripcion: 'Explora nuestra selección de juegos de mesa.',
  };

  /**
   * @description
   * carga productos segun la categoria recibida desde la ruta
   */
  constructor(
    private route: ActivatedRoute,
    private product: Product
  ) {
    this.route.paramMap.subscribe(params => {
      this.categoriaSeleccionada = params.get('categoria');

      if (this.categoriaSeleccionada) {
        this.productos = this.product.getProductsByCategory(this.categoriaSeleccionada);

        this.infoCategoria = this.titulosCategoria[this.categoriaSeleccionada];

        const indice = this.ordenCategorias.indexOf(this.categoriaSeleccionada);
        this.categoriaAnterior = this.ordenCategorias[indice - 1] || '';
        this.categoriaSiguiente = this.ordenCategorias[indice + 1] || '';
      } else {
        this.productos = this.product.getProducts();

        this.infoCategoria = {
          titulo: 'Catálogo de juegos',
          descripcion: 'Explora nuestra selección de juegos de mesa.',
        };

        this.categoriaAnterior = '';
        this.categoriaSiguiente = '';
      }
    });
  }
}