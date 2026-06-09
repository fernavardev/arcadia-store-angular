import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CATEGORIAS } from '../../data/categorias';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

  categorias = CATEGORIAS;

}