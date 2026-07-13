import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient {
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
