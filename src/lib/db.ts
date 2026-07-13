import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL || 'file:./dev.db';

  if (url.startsWith('file:')) {
    // SQLite local — sin adapter
    return new PrismaClient();
  }

  // PostgreSQL via adapter para Cloudflare
  const adapter = new PrismaPg({ connectionString: url, maxUses: 1 });
  return new PrismaClient({ adapter });
}

// Lazy: no se instancia durante el build (Next.js static page collection)
let _db: PrismaClient | undefined;
export const db = new Proxy({} as PrismaClient, {
  get(_, prop) {
    if (!_db) _db = globalForPrisma.prisma ?? createClient();
    if (typeof globalForPrisma.prisma === 'undefined') globalForPrisma.prisma = _db;
    return (_db as any)[prop];
  },
});
