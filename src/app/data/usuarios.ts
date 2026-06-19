export interface Usuario {
  id: number;
  nombre: string;
  usuario: string;
  email: string;
  password: string;
  direccion: string;
  rol: 'cliente' | 'admin';
}

export const USUARIOS_INICIALES: Usuario[] = [
  {
    id: 1,
    nombre: 'Administrador Arcadia',
    usuario: 'admin',
    email: 'admin@arcadia.cl',
    password: 'Admin123*',
    direccion: 'Casa matriz Arcadia Store',
    rol: 'admin',
  },
  {
    id: 2,
    nombre: 'Soporte Arcadia',
    usuario: 'soporte',
    email: 'soporte@arcadia.cl',
    password: 'Soporte123*',
    direccion: 'Área soporte Arcadia Store',
    rol: 'admin',
  },
];