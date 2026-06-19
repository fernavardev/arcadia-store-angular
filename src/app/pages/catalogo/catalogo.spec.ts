import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Catalogo } from './catalogo';

describe('Catalogo', () => {
  let component: Catalogo;
  let fixture: ComponentFixture<Catalogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catalogo],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ categoria: 'estrategia' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalogo);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia filtrar los productos por la categoria de la ruta', () => {
    expect(component.categoriaSeleccionada).toBe('estrategia');
    expect(component.productos.length).toBeGreaterThan(0);
    expect(
      component.productos.every(
        (producto) => producto.categoria.toLowerCase() === 'estrategia'
      )
    ).toBe(true);
  });
});