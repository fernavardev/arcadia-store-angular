import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

/**
 * @description
 * componente principal de la aplicacion
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

/**
 * @description
 * titulo base usado por la aplicacion
 */
export class App {
  protected readonly title = signal('arcadia-store-angular');
}
