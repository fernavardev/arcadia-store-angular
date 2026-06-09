import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRODUCTOS } from '../../data/productos';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {

  productos = PRODUCTOS;

}