import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL || '';

  // PostgreSQL en producción (Cloudflare Workers / Neon)
  if (url.startsWith('postgres')) {
    try {
      // Dynamic import for tree-shaking — only loaded when DATABASE_URL is postgres
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { PrismaPg } = require('@prisma/adapter-pg') as typeof import('@prisma/adapter-pg');
      const adapter = new PrismaPg({ connectionString: url, maxUses: 1 });
      return new PrismaClient({ adapter });
    } catch (e) {
      console.error('[db] Failed to init PG adapter, falling back to default:', e);
    }
  }

  // SQLite local or fallback
  return new PrismaClient();
}

// Lazy: no se instancia durante el build
let _db: PrismaClient | undefined;

export const db = new Proxy({} as PrismaClient, {
  get(_, prop) {
    if (!_db) {
      _db = globalForPrisma.prisma ?? createClient();
      globalForPrisma.prisma = _db;
    }
    return (_db as any)[prop];
  },
});
