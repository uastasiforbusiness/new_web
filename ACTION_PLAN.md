# Plan de Acción: Migrar SQLite → Neon (PostgreSQL)

## 1. Crear base de datos Neon (2 min)
```bash
# Opción A: Web UI
# 1. Ve a https://console.neon.tech
# 2. New Project → nombre: new-web-db
# 3. Copy connection string (empieza con postgresql://)

# Opción B: Vercel Marketplace (1-click)
# En Vercel Dashboard → Storage → Create Database → Neon
```

## 2. Configurar variables en Vercel
```
Settings → Environment Variables → Add New:
Name: DATABASE_URL
Value: postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
Environments: ☑ Production ☑ Preview ☑ Development
```

## 3. Cambios en código (3 archivos)

### prisma/schema.prisma
```prisma
datasource db {
  provider = "postgresql"   // era "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  // binaryTargets = ["native", "rhel-openssl-3.0.x"] // opcional para serverless
}
```

### package.json (scripts + dependencies)
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "vercel-build": "prisma generate && prisma migrate deploy && next build",
    "build": "next build",
    "dev": "next dev -p 3001",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev"
  },
  "dependencies": {
    "prisma": "^6.11.1",   // MOVIDO desde devDependencies
    "@prisma/client": "^6.11.1"
  },
  "devDependencies": {
    // prisma YA NO aquí
  }
}
```

### .env.example (actualizar)
```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require
```

## 4. Aplicar migraciones
```bash
# Local: genera y aplica a Neon
npm run db:generate
npm run db:migrate

# O en Vercel: el vercel-build lo hace automático
```

## 5. Push y verificar
```bash
git add .
git commit -m "chore: migrate to Neon PostgreSQL for Vercel deployment"
git push origin review/api-validation-and-cleanup
# GitHub Actions correrá lint + build → verde
# Vercel deployará con nueva BD → verde
```

## 6. Rollback si algo falla
```bash
# En Vercel: Settings → Functions → Redeploy previous deployment
# En Neon: Branching → crea branch de main antes de migrar
```