/**
 * In-memory chat store for environments without Cloudflare D1 (local/dev).
 * Enough for WhatsApp concierge smoke tests.
 * Not durable across restarts — D1 is required in production Workers.
 */

export interface MemChatSession {
  id: string;
  visitor_id: string;
  visitor_name: string | null;
  visitor_phone: string | null;
  status: string;
  mode: string;
  created_at: string;
  updated_at: string;
}

export interface MemChatMessage {
  id: string;
  session_id: string;
  direction: string;
  body: string;
  wa_message_id?: string | null;
  status: string;
  created_at: string;
}

const g = globalThis as unknown as {
  __bleaderChatSessions?: MemChatSession[];
  __bleaderChatMessages?: MemChatMessage[];
};

function sessions(): MemChatSession[] {
  if (!g.__bleaderChatSessions) g.__bleaderChatSessions = [];
  return g.__bleaderChatSessions;
}

function messages(): MemChatMessage[] {
  if (!g.__bleaderChatMessages) g.__bleaderChatMessages = [];
  return g.__bleaderChatMessages;
}

export const memoryDb = {
  chatSession: {
    findFirst: async (opts: {
      where: { visitorId?: string; status?: string; visitorPhone?: string };
      orderBy?: { createdAt?: 'desc' | 'asc'; updatedAt?: 'desc' | 'asc' };
    }) => {
      let list = sessions().filter((s) => {
        if (opts.where.visitorId && s.visitor_id !== opts.where.visitorId) return false;
        if (opts.where.status && s.status !== opts.where.status) return false;
        if (opts.where.visitorPhone && s.visitor_phone !== opts.where.visitorPhone) return false;
        return true;
      });
      if (opts.orderBy?.createdAt === 'desc' || opts.orderBy?.updatedAt === 'desc') {
        list = list.sort((a, b) => b.created_at.localeCompare(a.created_at));
      }
      return list[0] ?? null;
    },

    findUnique: async (opts: { where: { id: string } }) => {
      return sessions().find((s) => s.id === opts.where.id) ?? null;
    },

    create: async (opts: {
      data: Omit<MemChatSession, 'id' | 'created_at' | 'updated_at'>;
    }) => {
      const now = new Date().toISOString();
      const row: MemChatSession = {
        id: crypto.randomUUID(),
        visitor_id: opts.data.visitor_id,
        visitor_name: opts.data.visitor_name ?? null,
        visitor_phone: opts.data.visitor_phone ?? null,
        status: opts.data.status ?? 'active',
        mode: opts.data.mode ?? 'demo',
        created_at: now,
        updated_at: now,
      };
      sessions().push(row);
      return row;
    },

    update: async (opts: {
      where: { id: string };
      data: Partial<MemChatSession>;
    }) => {
      const s = sessions().find((x) => x.id === opts.where.id);
      if (!s) return;
      if (opts.data.visitor_phone !== undefined) s.visitor_phone = opts.data.visitor_phone;
      s.updated_at = new Date().toISOString();
    },
  },

  chatMessage: {
    findFirst: async (opts: { where: { waMessageId?: string } }) => {
      return (
        messages().find((m) => m.wa_message_id === (opts.where.waMessageId ?? '')) ?? null
      );
    },

    findMany: async (opts: {
      where: { sessionId?: string; createdAt?: { gt?: Date } };
      orderBy?: { createdAt?: 'desc' | 'asc' };
      take?: number;
    }) => {
      let list = messages().filter((m) => {
        if (opts.where.sessionId && m.session_id !== opts.where.sessionId) return false;
        if (opts.where.createdAt?.gt) {
          if (m.created_at <= opts.where.createdAt.gt.toISOString()) return false;
        }
        return true;
      });
      if (opts.orderBy?.createdAt === 'asc') {
        list = list.sort((a, b) => a.created_at.localeCompare(b.created_at));
      } else {
        list = list.sort((a, b) => b.created_at.localeCompare(a.created_at));
      }
      if (opts.take) list = list.slice(0, opts.take);
      return list;
    },

    create: async (opts: {
      data: Omit<MemChatMessage, 'id' | 'created_at'>;
    }) => {
      const row: MemChatMessage = {
        id: crypto.randomUUID(),
        session_id: opts.data.session_id,
        direction: opts.data.direction,
        body: opts.data.body,
        wa_message_id: opts.data.wa_message_id ?? null,
        status: opts.data.status ?? 'sent',
        created_at: new Date().toISOString(),
      };
      messages().push(row);
      return row;
    },

    updateMany: async (opts: {
      where: { waMessageId: string };
      data: { status: string };
    }) => {
      for (const m of messages()) {
        if (m.wa_message_id === opts.where.waMessageId) {
          m.status = opts.data.status;
        }
      }
    },
  },

  reservation: {
    create: async () => {
      throw new Error(
        'Reservations require Cloudflare D1. Deploy with npm run cf:deploy (or use Workers).'
      );
    },
  },
};
