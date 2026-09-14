# Estados de carga y página 404 de DZI

## Objetivo
Integrar los estados técnicos de navegación dentro de la misma experiencia editorial de la tienda.

## Cambios
- Crear una pantalla de carga breve con logotipo DZI, mensaje discreto y animación suave.
- Mostrarla durante las transiciones entre páginas sin alterar el contenido ni los datos actuales.
- Reemplazar la página 404 genérica por una vista en español con fondo chocolate, detalle botánico, tipografía editorial y acceso de regreso al inicio o al catálogo.
- Mantener accesibilidad, adaptación móvil y reducción de movimiento.
- Validar visualmente ambos estados y limpiar el error de hidratación observado en la vista previa.

## Detalles técnicos
- Usar un componente visual compartido para los estados de carga y página no encontrada.
- Configurar el estado de carga global en el enrutador y conservar el límite 404 en la raíz.
- Reutilizar los tokens, tipografías y botones existentes de DZI.
