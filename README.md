# DZI: Crafted Luxury

Crea una aplicación web e-commerce de lujo para la marca "DZI". La plataforma debe incluir un sistema de autenticación ficticio/simulado y navegación basada en tres roles de usuario: Cliente, Vendedor y Administrador.

--- 1. ESTILO VISUAL Y DISEÑO (DESIGN SYSTEM) ---

- Paleta de colores:

  * Fondo principal: Marrón café profundo / Chocolate oscuro (#18110c / #1f1610).

  * Tarjetas y elevaciones: Café espresso suave (#261c15) con bordes delgados e iluminación sutil (border: 1px solid rgba(226, 213, 195, 0.12)).

  * Textos y destacados: Crema cálido (#e8dec8) y Beige seda (#c8bca8).

  * Accentos/Botones: Marfil cálido (#f3ece0) con texto oscuro para contraste.

- Textura del fondo (No sólido, no degradado simple):

  * Agrega un patrón de textura orgánico sutil (micro-grain / ruido fotográfico refinado).

  * Incluye ilustraciones de líneas botánicas (siluetas vectoriales de hojas/ramas) muy tenue con opacidad ultra baja (3% a 5%) en el fondo de las secciones para dar un toque táctil de naturaleza sin distraer.

  * Efecto de viñeta tenue en las esquinas y destellos de luz radial cálida muy suave.

- Tipografía:

  * Títulos: Serif elegante y editorial (ej. Cormorant Garamond o Playfair Display).

  * Cuerpo y controles UI: Sans-serif limpia y legible (ej. Inter o Plus Jakarta Sans).

--- 2. VISTAS Y NAVEGACIÓN PRINCIPAL ---

Navegación superior (Header):

- Logo "DZI" minimalista.

- Menú de navegación: Inicio, Catálogo, Colecciones, Sobre DZI, Contacto.

- Buscador interactivo, Ícono de Carrito (con badge de cantidad), Selector de Rol (para alternar entre Cliente, Vendedor y Administrador durante la demo).

--- 3. MÓDULOS Y VISTAS SEGÚN EL ROL ---

A) VISTA CLIENTE:

1. Landing Page (Inicio):

   - Hero Section: Título editorial ("DZI: El Lujo de la Tierra"), imagen destacada de prenda/producto, botón de compra rápida.

   - Sección "Naturaleza Táctil & Botánica": Cuadrícula de tarjetas explicando materiales nobles (Lana Virgen, Tntes de Nogal, Aislamiento Térmico, Seda Salvaje).

   - Catálogo destacado: Tarjetas de producto con foto, título, precio, indicador de stock disponible y botón "Añadir al carrito".

   - Storytelling / Manifiesto: "La arquitectura de un abrigo honesto" con estética editorial de revista de moda.

   - Footer completo con enlaces, newsletter y sello de sostenibilidad.

2. Catálogo de Productos y Ficha de Producto:

   - Filtros por categoría, precio y disponibilidad.

   - Vista detallada del producto: Galería de imágenes, selector de talla/color, pestaña de procedencia de materiales y cálculo de envío.

3. Carrito de Compras y Checkout:

   - Slide-over / Modal interactivo de carrito lateral.

   - Cálculo automático de subtotal, impuestos y opción de aplicar cupón.

   - Pasarela de pago simulada (Checkout) en 3 pasos: Dirección, Envío y Confirmación.

B) VISTA VENDEDOR:

- Panel de Gestión de Pedidos:

  * Lista de pedidos entrantes filtrable por estado (Pendiente, En preparación, Enviado, Entregado).

  * Capacidad para actualizar el estado del envío.

- Gestión Rápida de Inventario:

  * Lista de productos asignados con stock en tiempo real.

  * Botón para ajustar existencias de manera rápida.

C) VISTA ADMINISTRADOR (Gestión Integral):

- Dashboard con Métricas Clave (KPIs): Ventas totales, productos más vendidos, nivel general de inventario.

- Módulo de Gestión de Inventario (CRUD):

  * Tabla interactiva con búsqueda, paginación y filtros.

  * Formulario modal para "Crear nuevo producto" y "Editar producto" (campos: Nombre, Categoría, Precio, Stock, Materiales, Imágenes).

  * Alertas visuales de stock bajo (ej. cuando quedan menos de 5 unidades).

- Módulo de Usuarios y Roles: Lista para cambiar permisos de usuarios entre Cliente, Vendedor y Admin.

--- 4. INTERACTIVIDAD Y ESTADOS DE REVENTA ---

- Mantiene el estado global del carrito de compras (añadir, remover, modificar cantidad).

- Incluye un "Role Switcher" visible en la parte superior para poder probar la experiencia de Cliente, Vendedor y Admin fácilmente.

- Transiciones suaves (smooth hover, animaciones de entrada fluidas).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6399da0e-5f50-431f-a02e-39807b6f7997).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
