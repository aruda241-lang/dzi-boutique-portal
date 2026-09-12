# DZI — e-commerce de lujo por roles

## Objetivo
Crear una experiencia e-commerce completa y demostrable para DZI, con estética editorial oscura, datos simulados y navegación diferenciada para Cliente, Vendedor y Administrador.

## Alcance
- Construir una navegación compartida con logo, páginas públicas, búsqueda, carrito lateral y selector visible de rol.
- Crear Inicio, Catálogo, Colecciones, Sobre DZI y Contacto como páginas independientes.
- Crear ficha de producto con galería, talla, color, materiales y cálculo de envío.
- Implementar carrito global con cantidades, cupón, subtotal e impuestos.
- Crear checkout simulado en tres pasos: dirección, envío y confirmación.
- Crear acceso ficticio para seleccionar una identidad de demostración, sin cuentas reales ni almacenamiento externo.
- Crear panel de Vendedor con pedidos filtrables, cambio de estado e inventario ajustable.
- Crear panel de Administrador con métricas, inventario CRUD en memoria, búsqueda, filtros, paginación y gestión simulada de roles.

## Diseño
- Fondo chocolate profundo con textura de grano, viñeta, luces cálidas y líneas botánicas tenues.
- Tarjetas espresso con bordes finos, crema y beige para texto, marfil para acciones.
- Cormorant Garamond para títulos y Plus Jakarta Sans para cuerpo y controles.
- Fotografía de moda editorial generada específicamente para DZI.
- Movimiento discreto y fluido, respetando preferencias de movimiento reducido.

## Detalles técnicos
- Estado compartido en React para rol, carrito, inventario y pedidos durante la sesión.
- Rutas TanStack separadas y metadatos únicos para cada página.
- Componentes reutilizables para encabezado, pie, productos, carrito, tablas y formularios.
- Datos y autenticación exclusivamente simulados; los cambios se reinician al recargar.
- Validación visual y funcional en escritorio y móvil.
