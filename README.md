# Arcadia Store Angular

## Descripción

Evolución del proyecto desarrollado previamente (Arcadia Store) con HTML, CSS, Bootstrap y JavaScript, En esta versión la aplicación es migrada a Angular utilizando componentes, rutas, variables TypeScript y directivas, manteniendo la identidad visual y funcional del proyecto original

La aplicación permite explorar distintas categorías de juegos de mesa, visualizar información detallada de cada producto y utilizar formularios conectados mediante Angular

---

## Tecnologías utilizadas

* Angular 21
* TypeScript
* HTML5
* CSS3
* Bootstrap 5
* Angular Router
* Angular Forms (ngModel)
* GitHub
* Trello

---

## Funcionalidades implementadas

### Inicio

* Visualización de categorías de juegos de mesa
* Navegación entre secciones de la aplicación
* Diseño responsivo

### Catálogo

* Visualización dinámica de productos mediante datos estáticos en TypeScript
* Filtrado de productos por categoría
* Navegación entre categorías
* Uso de directivas Angular (`ngFor` y `ngIf`)

### Detalle de producto

* Vista dinámica basada en el identificador del producto
* Información detallada del juego seleccionado
* Navegación de retorno a la categoría correspondiente

### Registro

* Formulario de registro migrado desde la versión anterior
* Uso de `ngModel` para el enlace de datos
* Simulación (persistencia no implementada aun) de registro exitoso mediante Angular

---

## Estructura principal del proyecto

```text
src/
├── app/
│   ├── components/
│   │   ├── footer/
│   │   └── navbar/
│   │
│   ├── data/
│   │   ├── categorias.ts
│   │   └── productos.ts
│   │
│   └── pages/
│       ├── inicio/
│       ├── catalogo/
│       ├── detalle-producto/
│       └── registro/
│
├── public/
│   └── img/
│
└── styles.css
```

---

## Ejecución del proyecto

Instalar dependencias:

```bash
npm install
```

Ejecutar aplicación:

```bash
ng serve
```

Abrir en el navegador:

```text
http://localhost:4200
```
