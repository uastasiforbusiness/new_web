import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

async function createClient(): Promise<PrismaClient> {
  const url = process.env.DATABASE_URL || 'file:./dev.db';

  if (url.startsWith('file:')) {
    // SQLite local — sin adapter
    return new PrismaClient();
  }

  // PostgreSQL via adapter para Cloudflare (import dinámico para evitar bundling)
  const { PrismaPg } = await import('@prisma/adapter-pg');
  const adapter = new PrismaPg({ connectionString: url, maxUses: 1 });
  return new PrismaClient({ adapter });
}

// Lazy: no se instancia durante el build (Next.js static page collection)
let _db: PrismaClient | undefined;
let _dbPromise: Promise<PrismaClient> | undefined;

function getDb(): PrismaClient | Promise<PrismaClient> {
  if (_db) return _db;
  if (!_dbPromise) {
    _dbPromise = globalForPrisma.prisma
      ? Promise.resolve(globalForPrisma.prisma)
      : createClient().then((client) => {
          _db = client;
          globalForPrisma.prisma = client;
          return client;
        });
  }
  return _dbPromise;
}

export const db = new Proxy({} as PrismaClient, {
  get(_, prop) {
    const client = getDb();
    if (client instanceof PrismaClient) {
      return (client as any)[prop];
    }
    // Si es Promise (solo en producción con PG), devolvemos undefined
    // y dejamos que Next.js maneje la carga en runtime
    if (!_db) return undefined;
    return (_db as any)[prop];
  },
});
