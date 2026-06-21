# Arcadia Store Angular

## Descripción

## Descripción

Arcadia Store es una tienda web orientada a la venta y exploración de juegos de mesa, pensada para ofrecer a los usuarios una experiencia simple e intuitiva al momento de navegar por distintas categorías de productos.

La aplicación permite visualizar información detallada de cada juego, registrar usuarios, administrar un carrito de compras, realizar compras simuladas y gestionar distintos módulos dependiendo del tipo de usuario que accede al sistema.

---

## Objetivo del proyecto

El presente proyecto corresponde a la evolución de una versión desarrollada previamente utilizando HTML, CSS, Bootstrap y JavaScript, la cual es migrada a Angular con el objetivo de aprovechar las herramientas que ofrece el framework para construir una aplicación más dinámica e interactiva, incorporando nuevas funcionalidades como formularios reactivos, manejo de usuarios, persistencia de datos, navegación entre componentes y pruebas unitarias.

---

## Tecnologías utilizadas

* Angular 21
* TypeScript
* HTML5
* CSS3
* Bootstrap 5
* Angular Router
* Reactive Forms
* LocalStorage / SessionStorage
* Vitest (Angular Test Runner para pruebas unitarias)
* GitHub (versionado de codigo)
* Trello (organizacion del desarrollo)

---

## Funcionalidades implementadas

### Navegación general

* Sistema de rutas mediante Angular Router
* Navbar dinámico según sesión activa
* Menú hamburguesa lateral para navegación por categorías
* Navegación condicional según rol de usuario

---

### Cliente

* Registro de usuarios con persistencia local
* Inicio de sesión
* Recuperación de contraseña
* Edición de perfil
* Navegación por categorías
* Visualización de detalle de productos
* Agregar productos al carrito
* Modificación dinámica de cantidades
* Finalización de compra
* Historial de compras por usuario

---

### Administración

* Inicio de sesión mediante usuarios administradores semilla
* Registro de nuevos productos
* Persistencia dinámica del catálogo
* Inventario automático de productos registrados
* Administración de usuarios
* Conversión de usuario cliente a administrador

---

### Persistencia de datos simulada

El sistema utiliza almacenamiento local del navegador para simular persistencia de datos:

* LocalStorage para usuarios, productos, carrito y compras
* SessionStorage para sesión activa del usuario

Se incorporan datos semilla automáticos al iniciar la aplicación:

* Usuarios administradores
* Catálogo inicial de productos

---

## Formularios reactivos implementados

Formularios principales utilizando Angular Reactive Forms:

* Registro
* Login
* Recuperación de contraseña
* Perfil de usuario
* Administración de productos

Cada formulario incorpora:

* FormGroup
* FormBuilder
* Validators
* Validación visual de campos
* Manejo de errores
* Reinicio de formularios
* Persistencia de datos integrada

---

## Pruebas unitarias implementadas

Como parte del desarrollo se incorporaron algunas pruebas unitarias orientadas a validar el comportamiento de funcionalidades específicas de la aplicación, entre ellas:

* Filtrado correcto de productos según la categoría recibida por ruta.
* Carga correcta del producto seleccionado según el identificador recibido por ruta.

Ejecución:

```bash
ng test
```

---

## Estructura principal del proyecto

```text
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   └── footer/
│   │
│   ├── data/
│   │   ├── categorias.ts
│   │   ├── productos.ts
│   │   └── usuarios.ts
│   │
│   ├── services/
│   │   ├── auth.ts
│   │   ├── cart.ts
│   │   ├── product.ts
│   │   └── storage.ts
│   │
│   └── pages/
│       ├── inicio/
│       ├── catalogo/
│       ├── detalle-producto/
│       ├── registro/
│       ├── login/
│       ├── recuperar/
│       ├── perfil/
│       ├── carrito/
│       ├── mis-compras/
│       ├── admin-productos/
│       ├── admin-inventario/
│       └── admin-usuarios/
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

Abrir en navegador:

```text
http://localhost:4200
```
