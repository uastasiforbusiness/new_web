import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

/**
 * Prisma client for Cloudflare Workers.
 *
 * Uses @prisma/adapter-pg (HTTP-based via pg driver with nodejs_compat)
 * instead of the default TCP-based PrismaClient.
 *
 * The `maxUses: 1` option ensures each connection is used only once,
 * which is required by the Workers runtime (no connection reuse across requests).
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const createClient = () => {
  // Use standard PrismaClient for local development (SQLite)
  // Check for 'file:' prefix or absence of 'postgres' to identify SQLite
  const isSQLite = !process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:');
  
  if (process.env.NODE_ENV === 'development' || isSQLite) {
    return new PrismaClient()
  }
  
  // Use PG adapter for Cloudflare/Production
  const connectionString = process.env.DATABASE_URL ?? ''
  try {
    const adapter = new PrismaPg({ connectionString, maxUses: 1 })
    return new PrismaClient({ adapter })
  } catch (error) {
    console.error('Failed to initialize Prisma with PG adapter, falling back to standard client', error)
    return new PrismaClient()
  }
}

export const db =
  globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
