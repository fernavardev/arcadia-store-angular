export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descuento: number;
  imagen: string;
  descripcion: string;
}

export const PRODUCTOS: Producto[] = [
  {
    id: 1,
    nombre: 'Catan',
    categoria: 'Estrategia',
    precio: 34990,
    stock: 8,
    descuento: 10,
    imagen: '/img/juegos/catan.jpg',
    descripcion: 'Construye asentamientos, administra recursos y expande tu territorio para dominar la isla.'
  },

  {
    id: 2,
    nombre: 'Carcassonne',
    categoria: 'Estrategia',
    precio: 27990,
    stock: 7,
    descuento: 0,
    imagen: '/img/juegos/carcassonne.jpg',
    descripcion: 'Crea paisajes medievales y obtén puntos colocando estratégicamente tus seguidores.'
  },

  {
    id: 3,
    nombre: 'Ticket to Ride',
    categoria: 'Estrategia',
    precio: 39990,
    stock: 6,
    descuento: 15,
    imagen: '/img/juegos/ticket-to-ride.jpg',
    descripcion: 'Conecta ciudades mediante rutas ferroviarias y completa objetivos para ganar la partida.'
  },

  {
    id: 4,
    nombre: 'Dixit',
    categoria: 'Familiares',
    precio: 29990,
    stock: 10,
    descuento: 0,
    imagen: '/img/juegos/dixit.jpg',
    descripcion: 'Utiliza tu imaginación para interpretar ilustraciones y descubrir las historias ocultas.'
  },

  {
    id: 5,
    nombre: 'Dobble',
    categoria: 'Familiares',
    precio: 14990,
    stock: 15,
    descuento: 5,
    imagen: '/img/juegos/dobble.jpg',
    descripcion: 'Encuentra símbolos coincidentes antes que tus rivales en partidas rápidas y divertidas.'
  },

  {
    id: 6,
    nombre: 'UNO',
    categoria: 'Familiares',
    precio: 9990,
    stock: 20,
    descuento: 0,
    imagen: '/img/juegos/uno.jpg',
    descripcion: 'Combina colores y números mientras intentas quedarte sin cartas antes que los demás.'
  },

  {
    id: 7,
    nombre: 'Exploding Kittens',
    categoria: 'Cartas',
    precio: 18990,
    stock: 12,
    descuento: 10,
    imagen: '/img/juegos/exploding-kittens.jpg',
    descripcion: 'Evita los gatitos explosivos utilizando cartas especiales para sobrevivir hasta el final.'
  },

  {
    id: 8,
    nombre: 'Sushi Go!',
    categoria: 'Cartas',
    precio: 16990,
    stock: 11,
    descuento: 0,
    imagen: '/img/juegos/sushi-go.jpg',
    descripcion: 'Selecciona las mejores combinaciones de sushi para obtener la mayor cantidad de puntos.'
  },

  {
    id: 9,
    nombre: 'The Mind',
    categoria: 'Cartas',
    precio: 15990,
    stock: 9,
    descuento: 5,
    imagen: '/img/juegos/the-mind.jpg',
    descripcion: 'Coordínate con tu equipo sin hablar para jugar las cartas en el orden correcto.'
  },

  {
    id: 10,
    nombre: 'Pandemic',
    categoria: 'Cooperativos',
    precio: 36990,
    stock: 6,
    descuento: 15,
    imagen: '/img/juegos/pandemic.jpg',
    descripcion: 'Colabora con otros jugadores para contener enfermedades y salvar a la humanidad.'
  },

  {
    id: 11,
    nombre: 'Hanabi',
    categoria: 'Cooperativos',
    precio: 13990,
    stock: 14,
    descuento: 0,
    imagen: '/img/juegos/hanabi.jpg',
    descripcion: 'Trabaja en equipo utilizando pistas limitadas para crear el espectáculo perfecto.'
  },

  {
    id: 12,
    nombre: 'The Crew',
    categoria: 'Cooperativos',
    precio: 17990,
    stock: 10,
    descuento: 10,
    imagen: '/img/juegos/the-crew.jpg',
    descripcion: 'Completa misiones espaciales mediante comunicación estratégica y trabajo colaborativo.'
  }
];