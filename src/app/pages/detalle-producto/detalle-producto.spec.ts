import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';

import { DetalleProducto } from './detalle-producto';

describe('DetalleProducto', () => {
  let component: DetalleProducto;
  let fixture: ComponentFixture<DetalleProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleProducto],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia cargar el producto por el id de la ruta', () => {
    expect(component.producto).toBeTruthy();
    expect(component.producto?.id).toBe(1);
  });
});