import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neon } from '@neondatabase/serverless';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL || '';

  // PostgreSQL en producción (Neon / Cloudflare Workers)
  if (url.startsWith('postgres')) {
    const sql = neon(url);
    const adapter = new PrismaNeon(sql);
    return new PrismaClient({ adapter });
  }

  // SQLite local
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
