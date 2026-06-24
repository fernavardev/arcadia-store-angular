import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CATEGORIAS } from '../../data/categorias';
import { RouterLink } from '@angular/router';

/**
 * @description
 * componente encargado de mostrar las categorias principales de la tienda
 */
@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

  /**
   * @description
   * lista de categorias disponibles en la pagina de inicio
   */
  categorias = CATEGORIAS;

}