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

### CRÍTICO (Resuelto)

- **Limpieza de CI/CD:** Se eliminó la duplicación entre `ci.yml` y `deploy.yml` en GitHub. Se mantiene `deploy.yml` como el pipeline principal (Lint, Build, Migraciones, Vercel) y `.gitlab-ci.yml` como validador secundario para mantener compatibilidad multiplataforma.
- Mantener `DATABASE_URL` configurada en Vercel Production/Preview y como GitHub secret si se quieren migraciones automáticas.

### IMPORTANTE

- Añadir tests mínimos para `/api/reserve`.
- Añadir política de privacidad real/enlazada para completar el requisito de consentimiento.
- Reemplazar rate limit in-memory por Redis/KV si el tráfico o el riesgo justifican protección distribuida.

### NICE

- Medir Lighthouse.
- Revisar tamaños de imágenes.
- Añadir panel/admin o email de notificación para nuevas reservas.
