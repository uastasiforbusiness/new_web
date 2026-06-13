# Investigación — Next.js + Prisma + Vercel

## Resumen

SQLite no es adecuado para Vercel porque el filesystem serverless es efímero. El proyecto actual ya está migrado a PostgreSQL mediante Prisma.

## Decisión aplicada

- `provider = "postgresql"` en `prisma/schema.prisma`.
- `DATABASE_URL` como variable de entorno.
- `prisma generate` en `postinstall` y en `npm run vercel-build`.
- Migraciones separadas del build en GitHub Actions cuando existe `DATABASE_URL`.

## Recomendación operativa

Usar Neon/PostgreSQL para producción y preview. Mantener `DATABASE_URL` en:

- Vercel Environment Variables: Production + Preview + Development.
- GitHub Secrets: `DATABASE_URL` si el workflow debe ejecutar `prisma migrate deploy`.

## Notas

- Turso/SQLite puede ser útil para casos read-heavy, pero no se recomienda como primera opción para reservas transaccionales en Vercel.
- Prisma + PostgreSQL es la ruta más simple y compatible con Vercel.
- El workflow actual usa Vercel CLI nativo; no depende de BetaHuhn ni de webhooks Vercel para feature branches.
