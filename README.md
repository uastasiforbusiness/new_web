# B LEADER — Premium Car Rental

Web de alquiler de coches premium construida con Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui y Prisma sobre SQLite.

## Requisitos

- Node.js 20+
- npm

## Configuración

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Copia las variables de entorno y ajústalas si es necesario:
   ```bash
   cp .env.example .env
   ```
3. Genera el cliente de Prisma y crea la base de datos:
   ```bash
   npm run db:generate
   npm run db:push
   ```

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en el puerto 3001 |
| `npm run build` | Build de producción (output standalone) |
| `npm run start` | Servidor de producción en el puerto 3000 |
| `npm run lint` | Linter (ESLint) |
| `npm run db:migrate` | Migraciones de Prisma en desarrollo |

## Estructura

- `src/app` — rutas y API (App Router)
- `src/components/velox` — componentes propios del sitio
- `src/components/ui` — componentes shadcn/ui
- `prisma/schema.prisma` — modelo de datos (reservas)
