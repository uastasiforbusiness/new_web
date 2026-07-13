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
  if (process.env.NODE_ENV === 'development' || !process.env.DATABASE_URL?.startsWith('postgres')) {
    return new PrismaClient()
  }
  
  // Use PG adapter for Cloudflare/Production
  const connectionString = process.env.DATABASE_URL ?? ''
  const adapter = new PrismaPg({ connectionString, maxUses: 1 })
  return new PrismaClient({ adapter })
}

export const db =
  globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
