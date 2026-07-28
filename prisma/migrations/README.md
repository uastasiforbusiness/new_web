# Database Migrations

Using Prisma for schema modelling, but direct D1 SQLite commands are used via `src/lib/db.ts` for Cloudflare Workers compatibility.

## Compatibility Notes

- Prisma schema (`schema.prisma`) uses `snake_case` field names for D1 compatibility.
- SQL `init.sql` defines tables in `snake_case` and aligns with Prisma.
- Do NOT use `PRAGMA foreign_keys = ON;` in Cloudflare D1 — disabled by default. Use `ON DELETE CASCADE` directly in `CREATE TABLE`.

## Migration Workflow

1. Update `prisma/schema.prisma` (always use `snake_case`)
2. Update `prisma/d1/init.sql` manually (or via IDE) to match `schema.prisma` fields
3. Apply to remote D1:
   ```bash
   npx wrangler d1 execute bleader-db --remote --file=prisma/d1/init.sql
   ```

> Note: the app accesses D1 through the raw-SQL wrapper in `src/lib/db.ts`
> (no Prisma Client at runtime), so there is no client generation step.
> The Prisma CLI is kept only for schema validation and local SQLite
> experimentation (`npm run db:push` against `DATABASE_URL`).

## Future

Once Cloudflare supports `ON UPDATE`/`ON DELETE` cascade in DDL or adds FK constraints, automation may be possible. For now, manual alignment is required.
