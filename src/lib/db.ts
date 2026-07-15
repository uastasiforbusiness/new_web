/**
 * D1 Database Client — direct binding (sin Prisma, sin WASM)
 *
 * OpenNext expone los bindings del Worker a través de getCloudflareContext(),
 * NO a través de globalThis. Los secrets tipo string sí llegan vía process.env
 * (el adapter los copia), pero los bindings (D1, R2, KV) requieren este canal.
 */
import { getCloudflareContext } from '@opennextjs/cloudflare';

async function getD1(): Promise<D1Database> {
  const ctx = await getCloudflareContext({ async: true });
  const db = ctx.env.DB;
  if (!db) {
    throw new Error(
      'D1 binding "DB" no disponible. Verifica que wrangler.jsonc declare ' +
      'd1_databases con binding "DB" y que el entorno tenga acceso.'
    );
  }
  return db;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function d1Query(sql: string, params?: (string | number | null)[]): Promise<any[]> {
  const db = await getD1();
  const result = await db.prepare(sql).bind(...(params ?? [])).all();
  if (!result.success) throw new Error(result.error ?? 'D1 query failed');
  return result.results as any[];
}

async function d1Exec(sql: string, params?: (string | number | null)[]): Promise<any> {
  const db = await getD1();
  return db.prepare(sql).bind(...(params ?? [])).run();
}

async function d1First(sql: string, params?: (string | number | null)[]): Promise<any> {
  const rows = await d1Query(sql, params);
  return rows[0] ?? null;
}

// ─── Tabla: chat_sessions ───────────────────────────────────────────────
export const db = {
  chatSession: {
    findFirst: async (opts: {
      where: { visitorId?: string; status?: string; visitorPhone?: string };
      orderBy?: { createdAt?: 'desc' | 'asc'; updatedAt?: 'desc' | 'asc' };
    }) => {
      const conditions: string[] = [];
      const params: (string | number)[] = [];
      if (opts.where.visitorId) { conditions.push('visitor_id = ?'); params.push(opts.where.visitorId); }
      if (opts.where.status) { conditions.push('status = ?'); params.push(opts.where.status); }
      if (opts.where.visitorPhone) { conditions.push('visitor_phone = ?'); params.push(opts.where.visitorPhone); }
      const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
      const order = opts.orderBy?.createdAt === 'desc' ? 'ORDER BY created_at DESC' :
        opts.orderBy?.updatedAt === 'desc' ? 'ORDER BY updated_at DESC' : '';
      return d1First(`SELECT * FROM chat_sessions ${where} ${order} LIMIT 1`, params) as Promise<ChatSession | null>;
    },

    findUnique: async (opts: { where: { id: string } }) => {
      return d1First('SELECT * FROM chat_sessions WHERE id = ?', [opts.where.id]) as Promise<ChatSession | null>;
    },

    create: async (opts: { data: Omit<ChatSession, 'id' | 'created_at' | 'updated_at'> }) => {
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      await d1Exec(
        `INSERT INTO chat_sessions (id, visitor_id, visitor_name, visitor_phone, status, mode, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, opts.data.visitor_id, opts.data.visitor_name ?? null, opts.data.visitor_phone ?? null,
         opts.data.status ?? 'active', opts.data.mode ?? 'demo', now, now]
      );
      return d1First('SELECT * FROM chat_sessions WHERE id = ?', [id]) as Promise<ChatSession | null>;
    },

    update: async (opts: { where: { id: string }; data: Partial<ChatSession> }) => {
      const sets: string[] = [];
      const params: (string | number | null)[] = [];
      if (opts.data.visitor_phone !== undefined) { sets.push('visitor_phone = ?'); params.push(opts.data.visitor_phone); }
      sets.push('updated_at = ?'); params.push(new Date().toISOString());
      params.push(opts.where.id);
      await d1Exec(`UPDATE chat_sessions SET ${sets.join(', ')} WHERE id = ?`, params);
    },
  },

  chatMessage: {
    findFirst: async (opts: { where: { waMessageId?: string } }) => {
      return d1First('SELECT * FROM chat_messages WHERE wa_message_id = ?', [opts.where.waMessageId ?? '']);
    },

    findMany: async (opts: {
      where: { sessionId?: string; createdAt?: { gt?: Date } };
      orderBy?: { createdAt?: 'desc' | 'asc' };
      take?: number;
    }) => {
      const conditions: string[] = [];
      const params: (string | number)[] = [];
      if (opts.where.sessionId) { conditions.push('session_id = ?'); params.push(opts.where.sessionId); }
      if (opts.where.createdAt?.gt) { conditions.push('created_at > ?'); params.push(opts.where.createdAt.gt.getTime()); }
      const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
      const order = opts.orderBy?.createdAt === 'asc' ? 'ORDER BY created_at ASC' : 'ORDER BY created_at DESC';
      const limit = opts.take ? `LIMIT ${opts.take}` : '';
      return d1Query(`SELECT * FROM chat_messages ${where} ${order} ${limit}`, params);
    },

    create: async (opts: { data: Omit<ChatMessage, 'id' | 'created_at'> }) => {
      const id = crypto.randomUUID();
      await d1Exec(
        `INSERT INTO chat_messages (id, session_id, direction, body, wa_message_id, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, opts.data.session_id, opts.data.direction, opts.data.body,
         opts.data.wa_message_id ?? null, opts.data.status ?? 'sent', new Date().toISOString()]
      );
      return d1First('SELECT * FROM chat_messages WHERE id = ?', [id]);
    },

    updateMany: async (opts: { where: { waMessageId: string }; data: { status: string } }) => {
      await d1Exec('UPDATE chat_messages SET status = ? WHERE wa_message_id = ?',
        [opts.data.status, opts.where.waMessageId]);
    },
  },

  reservation: {
    create: async (opts: { data: {
      carName: string; carVariant: string; customerName: string; email: string;
      phone: string; pickupDate: Date; returnDate: Date; consentAccepted: boolean;
      message: string | null;
    }}) => {
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      await d1Exec(
        `INSERT INTO reservations (id, car_name, car_variant, customer_name, email, phone,
         pickup_date, return_date, message, consent_accepted, consent_accepted_at, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
        [id, opts.data.carName, opts.data.carVariant, opts.data.customerName, opts.data.email,
         opts.data.phone, opts.data.pickupDate.toISOString(), opts.data.returnDate.toISOString(),
         opts.data.message, opts.data.consentAccepted ? 1 : 0, now, now, now]
      );
      return { id };
    },
  },
};

// ─── Types ───────────────────────────────────────────────────────────────
interface ChatSession {
  id: string;
  visitor_id: string;
  visitor_name: string | null;
  visitor_phone: string | null;
  status: string;
  mode: string;
  created_at: string;
  updated_at: string;
}

interface ChatMessage {
  id: string;
  session_id: string;
  direction: string;
  body: string;
  wa_message_id?: string | null;
  status: string;
  created_at: string;
}
