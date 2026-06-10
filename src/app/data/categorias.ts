export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

export const CATEGORIAS: Categoria[] = [
  {
    id: 1,
    nombre: 'Estrategia',
    descripcion: 'Juegos para planificar, conquistar y tomar decisiones tácticas.',
    imagen: '/img/categorias/estrategia.jpg'
  },
  {
    id: 2,
    nombre: 'Familiares',
    descripcion: 'Opciones simples y entretenidas para jugar en grupo.',
    imagen: '/img/categorias/familiares.jpg'
  },
  {
    id: 3,
    nombre: 'Cartas',
    descripcion: 'Juegos rápidos, dinámicos y fáciles de transportar.',
    imagen: '/img/categorias/cartas.jpg'
  },
  {
    id: 4,
    nombre: 'Cooperativos',
    descripcion: 'Juegos donde todos colaboran para alcanzar un objetivo común.',
    imagen: '/img/categorias/cooperativos.jpg'
  }
];