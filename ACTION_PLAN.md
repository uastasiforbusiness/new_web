# Plan de Acción — Estado Actual

Este documento ya no debe leerse como plan pendiente de migración SQLite → PostgreSQL. Esa migración está aplicada en el código actual.

## Estado confirmado

- Prisma usa PostgreSQL en `prisma/schema.prisma`.
- `DATABASE_URL` viene de variables de entorno.
- `package.json` incluye `postinstall: prisma generate`.
- `npm run vercel-build` ejecuta `prisma generate && next build`.
- Las migraciones de producción/preview se ejecutan como paso opcional separado en `.github/workflows/deploy.yml`, solo si `DATABASE_URL` existe como GitHub secret.
- El formulario y `/api/reserve` requieren consentimiento explícito del usuario.
- Se añadió migración para `consentAccepted` y `consentAcceptedAt`.
- README actualizado con setup PostgreSQL/Neon y comandos actuales.

## Pendientes reales

### CRÍTICO

- Mantener `DATABASE_URL` configurada en Vercel Production/Preview y como GitHub secret si se quieren migraciones automáticas.
- Revisar duplicación de CI: `.github/workflows/deploy.yml`, `.github/workflows/ci.yml` y `.gitlab-ci.yml` validan lint/build por separado.

### IMPORTANTE

- Añadir tests mínimos para `/api/reserve`.
- Añadir política de privacidad real/enlazada para completar el requisito de consentimiento.
- Reemplazar rate limit in-memory por Redis/KV si el tráfico o el riesgo justifican protección distribuida.

### NICE

- Medir Lighthouse.
- Revisar tamaños de imágenes.
- Añadir panel/admin o email de notificación para nuevas reservas.
