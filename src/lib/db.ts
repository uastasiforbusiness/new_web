import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient {
  // D1 binding disponible en Cloudflare Workers (producción)
  if (typeof (globalThis as any).DB !== 'undefined') {
    const adapter = new PrismaD1((globalThis as any).DB);
    return new PrismaClient({ adapter });
  }

  // SQLite local (desarrollo)
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
