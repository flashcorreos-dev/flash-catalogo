# Despliegue automático en Render

El repositorio incluye `render.yaml` con un servicio web Node, plan `free`, rama `main` y `autoDeploy: true`. Esto hace que cada push a `main` dispare un nuevo build y despliegue.

## Activación única

1. Entrar a [Render](https://render.com/) y crear una cuenta o iniciar sesión con GitHub.
2. Elegir **New → Blueprint**.
3. Seleccionar el repositorio `flashcorreos-dev/flash-catalogo-store` y la rama `main`.
4. Render detectará `render.yaml`. Confirmar la creación del servicio.
5. Completar las variables marcadas como secretas (`DATABASE_URL`, `JWT_SECRET`, las variables OAuth y las claves `BUILT_IN_FORGE_*` / `VITE_FRONTEND_FORGE_*`) con los valores del entorno actual. No subir secretos al repositorio.
6. Esperar el primer deploy y abrir la URL pública asignada por Render.

A partir de ese momento, los cambios publicados en `main` se despliegan automáticamente. Para que OAuth siga funcionando en producción, la URL pública de Render debe quedar registrada también en la configuración del proveedor de autenticación.

## Comprobación posterior

Después del primer despliegue, revisar `/`, `/productos`, `/contacto`, `/preguntas-frecuentes` y `/cuenta`. También conviene probar el inicio de sesión y el envío de un pedido de prueba por WhatsApp.

> El servicio web gratuito puede entrar en reposo cuando no recibe tráfico. Al volver a visitarlo puede tardar unos segundos en responder; esto es una limitación del plan gratuito del proveedor, no un error de la aplicación.
