# Investigación: Next.js + Prisma + SQLite en Vercel (2026)

## Resumen Ejecutivo

**Problema raíz**: SQLite (`file:../db/custom.db`) **no funciona en Vercel** — el filesystem es efímero en serverless. Vercel lo confirma oficialmente.

**Problema secundario**: Falta `prisma generate` en el build command de Vercel.

**Solución obligatoria**: Migrar a base de datos externa (PostgreSQL recomendado).

---

## Hallazgos Clave (con confianza)

| Hallazgo | Confianza | Fuente |
|----------|-----------|--------|
| **SQLite no soportado en Vercel** | ✅ Confirmado (oficial) | [Vercel KB](https://vercel.com/kb/guide/is-sqlite-supported-in-vercel) |
| **postinstall "prisma generate" necesario** | ✅ Confirmado | [Prisma Docs](https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-vercel) |
| **Prisma en dependencies (no devDependencies)** | ✅ Confirmado | Prisma Docs |
| **Neon = mejor integración Vercel** | ✅ Verificado multi-fuente | Layerbase Blog 2026, Vercel Marketplace |
| **Turso + Prisma = Early Access (driverAdapters)** | ✅ Confirmado | Prisma Blog, Turso Docs |
| **PlanetScale hobby tier muerto (Abr 2024)** | ✅ Confirmado | Layerbase Blog 2026 |
| **Supabase = all-in-one pero lock-in** | ✅ Verificado | Layerbase Blog 2026 |

---

## Contradicciones Detectadas

| Claim | Fuente A | Fuente B | Veredicto |
|-------|----------|----------|-----------|
| "Turso funciona perfecto con Prisma hoy" | Turso Blog (marketing) | Prisma Blog = "Early Access", Turso Docs = "Migrate no soportado" | ⚡ Evidencia conflictiva — **no usar en producción** |
| "SQLite OK si usas vercel-file blob" | Foros | Vercel KB oficial = NO | ✅ Confirmado: Vercel KB gana |

---

## Recomendación Priorizada

### Opción 1: Neon (PostgreSQL) — **Recomendada**
- 1-click desde Vercel Marketplace
- Branching para preview deployments
- Free tier generoso (0.5GB storage, 190h compute/mes)
- Postgres estándar = migración fácil después

### Opción 2: Supabase — Si necesitas Auth + Storage + Realtime ya
- Bundle completo
- Lock-in real en auth/storage

### Opción 3: Turso — Solo si: read-heavy global, edge-first, accept EA risk
- SQLite real, embedded replicas (7.9ms vs 154ms)
- **NO** para migraciones automáticas (manual shell)
- Prisma driverAdapters = preview feature

---

## Plan de Acción Inmediato

1. **Crear proyecto Neon** (2 min): console.neon.tech → New Project → Copy connection string
2. **Actualizar Vercel**: Settings → Environment Variables → DATABASE_URL (Production + Preview)
3. **Cambiar schema.prisma**: `provider = "postgresql"` + `url = env("DATABASE_URL")`
4. **Mover prisma a dependencies**: `npm install prisma@latest --save` (no -D)
5. **Añadir postinstall**: `"postinstall": "prisma generate"` en package.json
6. **Build command Vercel**: `prisma generate && prisma migrate deploy && npm run build`
7. **Push y deploy**: el pipeline de GitHub Actions validará