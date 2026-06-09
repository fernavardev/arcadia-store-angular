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
    descripcion: 'Juegos para planificar, administrar recursos y tomar decisiones.',
    imagen: '/img/categorias/estrategia.jpg'
  },
  {
    id: 2,
    nombre: 'Familiares',
    descripcion: 'Experiencias accesibles para compartir con amigos y familia.',
    imagen: '/img/categorias/familiares.jpg'
  },
  {
    id: 3,
    nombre: 'Cartas',
    descripcion: 'Partidas rápidas basadas en cartas y mecánicas dinámicas.',
    imagen: '/img/categorias/cartas.jpg'
  },
  {
    id: 4,
    nombre: 'Cooperativos',
    descripcion: 'Juegos donde todos colaboran para alcanzar un objetivo común.',
    imagen: '/img/categorias/cooperativos.jpg'
  }
];