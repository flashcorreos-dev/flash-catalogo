# Verificación visual — FLASH

Fecha: 2026-09-19

La portada se renderiza con la barra de anuncio, header sticky, navegación, buscador, acceso a cuenta, carrito, hero oscuro con imagen de collares y CTA visibles. La ruta `/productos` muestra 40 productos, panel lateral de categorías, buscador y ordenamiento; las imágenes y precios se cargan correctamente. La ruta `/contacto` muestra el CTA de WhatsApp y tarjetas de horarios/entrega. La ruta `/cuenta` reconoce la sesión del preview, muestra el nombre del usuario y el estado vacío de historial.

No se observaron desbordes en el viewport de escritorio 1280×720. El preview reportó LSP y TypeScript sin errores.

## Verificación responsive móvil

En viewport 375×812, el anuncio, logo, iconos de cuenta/carrito, navegación horizontal, buscador y hero se adaptan sin desbordes. Productos mantiene el buscador, filtro colapsable y ordenamiento en una sola columna, con la primera tarjeta visible y correctamente recortada.

## Verificación funcional inicial

La navegación a `/productos?search=arnes` aplicó el término en el buscador y redujo el resultado a 7 productos. La página expone los controles de categorías, ordenamiento y botones Agregar. La consola del navegador no tenía errores previos.

## Verificación carrito

La prueba en preview encontró el botón Agregar, actualizó el contador a 1 y guardó una línea en `localStorage` (`flash-cart`). Al abrir el drawer real `.cart-drawer`, se confirmó que muestra el producto y el botón `Confirmar por WhatsApp`.

## Corrección 2026-09-19

La ruta `/productos` ahora muestra el menú principal solicitado: Collares, Correas, Manoplas, Bozales, Arneses, Pretales y Sets, con contador de productos por categoría. La captura de escritorio confirma que el menú queda visible y que el catálogo carga correctamente.

## Verificación funcional de corrección

El clic sobre Pretales activa el filtro y muestra 6 tarjetas. Durante la prueba, una búsqueda posterior mantuvo simultáneamente el filtro Pretales y por eso devolvió cero resultados; se ajustará la búsqueda para limpiar la categoría activa y buscar siempre sobre todo el catálogo.

## Verificación final

La búsqueda `/productos?search=arnes` devuelve 7 tarjetas y deja activa la opción Todos los productos. El menú presenta contadores actualizados: Collares 11, Correas 9, Manoplas 4, Bozales 1, Arneses 7, Pretales 6 y Sets 1. El helper de WhatsApp se validó con prueba unitaria contra el formato solicitado y los cuatro tests pasan.

## Verificación de ampliación

Productos muestra categorías principales y conserva un panel de filtros extensible para material y ancho; las tarjetas incorporan selector de cantidad. Cuenta muestra pestañas de Historial de pedidos y Ajustes del perfil, además del pedido existente con código, fecha, estado, cantidad de líneas, total y acción Ver detalle.

## Verificación funcional ampliada

La prueba de navegador activó Polipropileno y 3,00 cm, reduciendo el catálogo a 13 tarjetas; el selector de cantidad respondió a los controles de incremento. La ruta de Cuenta sin sesión muestra Ingresar/Crear cuenta y Recuperar cuenta mediante el proveedor seguro. En sesión de preview, la captura anterior mostró historial con código, fecha, estado, total y Ver detalle.

## Rediseño de Inicio y Contacto

La portada ahora muestra un carrusel de imágenes de productos con controles anterior/siguiente y puntos de navegación. Se eliminó el CTA redundante de hablar con FLASH y se reemplazó el bloque de métricas por una propuesta de valor sobre más de 25 años de experiencia, envíos a todo el país, materiales de alta calidad y atención detallista. Contacto muestra el horario de lunes a viernes de 8:00 a 18:00 y el botón de WhatsApp actualizado.

## Ajuste final de portada

Se confirmó en captura de escritorio que queda un único encabezado de navegación, el CTA dice `Ver catálogo`, la leyenda del hero fue retirada y la portada conserva el carrusel con los nuevos textos en la franja de beneficios.

## Corrección de filtros y encabezado

Se eliminó la segunda búsqueda del encabezado móvil; el header conserva una sola búsqueda. El filtro 2,50 cm selecciona automáticamente en `Arnes de Polipropileno con Correa` la variante `805 - ARNES C/ CORREA 2,50 CM`. El panel contiene el botón `Aplicar`, la categoría se muestra como `Combos` y al abrirla incluye ese arnés con correa. Build, TypeScript y pruebas pasan.

## Workflow administrativo de pedidos

Se agregó el estado Despachado y el historial persistente `orderStatusHistory`, incluyendo backfill de pedidos existentes. El cliente recibe timeline de estados y badges diferenciados; el panel `/admin` restringido a administradores permite actualizar Pendiente, Enviado por WhatsApp, Confirmado, Despachado, Completado y Cancelado con nota opcional. La ruta administrativa sin sesión fue verificada y muestra acceso protegido. TypeScript, 5 pruebas unitarias y build pasan.

## Filtros, métricas y privacidad — 2026-09-19

El panel admin ahora filtra en conjunto por estado, nombre/email del cliente y fechas Desde/Hasta. Las tarjetas de resumen muestran Total de pedidos, Pendientes, Despachados y Completados y permiten activar el filtro correspondiente. Las notas escritas desde el panel se almacenan con `isInternal = true`, se muestran en el panel y se excluyen de `orders.mine`, por lo que el cliente nunca las recibe. Se agregaron notificaciones internas al propietario para nuevos pedidos y cambios de estado. Se preparó `render.yaml` y documentación de despliegue gratuito; no se conectó un GitHub externo porque el remoto actual sigue siendo temporal de Manus y no se proporcionó un repositorio destino. Validación: TypeScript correcto, 5 pruebas correctas y build correcto.

## Exportación de lista de precios — 2026-09-19

Se incorporó la plantilla original `LISTAJUNIO2026m..xlsx` y una exportación por pedido desde el panel administrativo. La exportación conserva la hoja principal y su formato; procesa las filas 3 a 267 y las columnas A a L, completa la columna I/J fusionada de CANT con la cantidad por ART, escribe fórmulas `CANT × $` en K/L y suma `K3:K266` en K267. El mapeo se basa en el código ART presente en la variante del pedido. Se agregaron 1 prueba específica de XLSX; validación total: TypeScript correcto, 6 pruebas correctas y build correcto.

El despliegue desde GitHub quedó preparado con `render.yaml`, pero no puede conectarse todavía porque el remoto actual es temporal de Manus y el usuario aún no indicó el repositorio GitHub destino.

## Mejoras prioritarias — 2026-09-19

Se incorporó el logo de patita extraído desde `LOGOFLASH.png` con transparencia, girado 45 grados junto al wordmark FLASH en encabezado y pie. La tipografía del wordmark usa una serif de alto contraste inspirada en la referencia visual. Las preguntas sin coincidencia en FAQ ahora pueden enviarse a WhatsApp con el formato `Hola Flash, quería hacer una consulta: ...`. Se preparó una plantilla de email transaccional en español con estado, código de compra, detalle de artículos, total, enlace al historial y redes sociales; su envío queda opcional hasta disponer de remitente verificado y URL pública. Validación: TypeScript correcto, 6 pruebas correctas y build correcto.

Pendientes de segunda prioridad: botón de copiar datos bancarios, bloqueado hasta contar con alias/CBU y titular; activación real del proveedor de email, bloqueada hasta remitente verificado y URL pública.

## Revisión manual y asuntos de email — 2026-09-19

Se mantiene el pedido en revisión administrativa antes del pago: el cliente envía el pedido, el administrador decide entre Confirmado o Cancelado y sólo después de Confirmado se informa que puede avanzar con el pago. Se configuraron asuntos de email en español por estado: `FLASH · Recibimos tu pedido · CÓDIGO`, `FLASH · Tu pedido fue enviado a FLASH · CÓDIGO`, `FLASH · Tu pedido fue confirmado · CÓDIGO`, `FLASH · Tu pedido ya fue despachado · CÓDIGO`, `FLASH · Tu pedido fue completado · CÓDIGO` y `FLASH · Actualización de tu pedido · CÓDIGO` para cancelaciones.

## Búsqueda por código y mensajes admin — 2026-09-19

El panel administrativo ahora permite buscar pedidos por código de compra, además de conservar los filtros por cliente, estado y fecha. También incorpora un generador de mensajes con plantillas predeterminadas para Pendiente, Enviado por WhatsApp, Confirmado, Despachado, Completado y Cancelado. El administrador completa nombre, código, total y detalle; luego puede copiar el mensaje o abrir WhatsApp directamente. TypeScript, 6 pruebas y build correctos.
