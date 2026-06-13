# CI/CD — Estado Actual

Fecha: 2026-06-13
Alcance: Next.js 16 + Prisma PostgreSQL + Vercel + GitHub/GitLab remotes.

## Resumen ejecutivo

El pipeline actual está centrado en GitHub Actions. Vercel se invoca desde el workflow con Vercel CLI nativo. Las migraciones de Prisma están separadas del build y se ejecutan solo cuando `DATABASE_URL` existe como GitHub secret.

## Workflows

### `.github/workflows/deploy.yml`

Fuente de verdad para CI/CD.

Jobs:

- `ci`
  - `npm ci`
  - `npm run lint`
  - `npm run build`

- `deploy-preview`
  - Trigger: pull request a `main`
  - `vercel pull --environment=preview`
  - `npx prisma migrate deploy` solo si `DATABASE_URL` está presente
  - `vercel build`
  - `vercel deploy --prebuilt`
  - Comenta URL de preview en el PR

- `deploy-production`
  - Trigger: push a `main`
  - environment: `production`
  - `vercel pull --environment=production`
  - `npx prisma migrate deploy` solo si `DATABASE_URL` está presente
  - `vercel build --prod`
  - `vercel deploy --prebuilt --prod`

### `.github/workflows/ci.yml`

Pipeline duplicado de validación local: lint + build. Mantener solo si se quiere una señal CI independiente del deploy.

### `.gitlab-ci.yml`

Pipeline GitLab duplicado de validación para merge requests. Mantener solo si GitLab sigue usándose como mirror activo de revisión.

## Secrets requeridos

- `VERCEL_TOKEN` — token Vercel para GitHub Actions.
- `DATABASE_URL` — solo si se quieren migraciones automáticas desde Actions.
- Vercel Environment Variables:
  - `DATABASE_URL`
  - `NEXT_PUBLIC_PHONE`
  - `NEXT_PUBLIC_EMAIL`
  - `NEXT_PUBLIC_WHATSAPP_NUMBER`

## Riesgos conocidos

- Rate limit de `/api/reserve` es in-memory y no distribuido.
- No hay tests automatizados.
- El formulario ya exige consentimiento, pero falta política de privacidad real/enlazada.
- CI duplicada puede generar confusión si no se documenta cuál es fuente de verdad.

## Decisión actual

GitHub Actions + Vercel CLI nativo es el camino usado. No se recomienda volver a meter `prisma migrate deploy` dentro de `npm run vercel-build`.
