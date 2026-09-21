# Despliegue gratuito de FLASH

## Qué es GitHub y qué no es

GitHub guarda el código y permite versionarlo. GitHub Pages no puede ejecutar este proyecto completo porque la tienda utiliza un servidor Node, autenticación OAuth y una base de datos. Para mantener el costo en cero, el repositorio puede alojarse en GitHub y conectarse a un proveedor con plan gratuito para ejecutar Node.

## Configuración preparada

El archivo `render.yaml` deja configurado un servicio web Node con el plan gratuito, compilación mediante `pnpm build`, arranque con `pnpm start` y variables de entorno marcadas como secretas. El flujo esperado es:

1. Crear un repositorio privado o público en GitHub y subir el contenido del proyecto, sin incluir `.env`, contraseñas, tokens ni URLs con credenciales.
2. Crear un Web Service gratuito en Render y conectar el repositorio.
3. Usar `render.yaml` o cargar manualmente los comandos `pnpm install --frozen-lockfile && pnpm build` y `pnpm start`.
4. Cargar en Render las variables secretas del proyecto, incluida la conexión TiDB Cloud existente.
5. Registrar la URL pública del servicio como redirect/callback permitido en la configuración OAuth.

El plan gratuito puede suspender servicios inactivos y producir una demora en el primer acceso. La base de datos debe continuar en un servicio administrado; nunca se debe guardar dentro del filesystem efímero del servidor.

## Estado actual

El proyecto todavía tiene como remoto el repositorio temporal de artifacts de Manus, no un repositorio GitHub del negocio. Para completar la conexión automática hace falta que el propietario indique o cree el repositorio GitHub destino y autorice el proveedor de hosting. No se han modificado conectores ni se han enviado secretos a ningún servicio externo.

## Notificaciones

Los cambios de estado y los nuevos pedidos ya disparan notificaciones internas al propietario mediante el servicio de notificaciones incorporado. Para enviar correos a clientes se debe conectar un proveedor transaccional, por ejemplo Resend, y cargar su API key como secreto; no se activa automáticamente porque ningún proveedor de email está habilitado en la sesión.
