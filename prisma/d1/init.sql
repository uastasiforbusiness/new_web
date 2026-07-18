-- B LEADER — D1 schema (Cloudflare Workers) --
-- Idempotente: seguro de ejecutar en cada deploy.
-- Alineado con el wrapper de src/lib/db.ts (snake_case, timestamps ISO string).

-- ─── reservations ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reservations (
  id TEXT PRIMARY KEY,
  car_name TEXT NOT NULL,
  car_variant TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  pickup_date TEXT NOT NULL,
  return_date TEXT NOT NULL,
  message TEXT,
  consent_accepted INTEGER NOT NULL DEFAULT 0,
  consent_accepted_at TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_reservations_email ON reservations(email);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at);

-- ─── chat_sessions ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  visitor_name TEXT,
  visitor_phone TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  mode TEXT NOT NULL DEFAULT 'demo',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_visitor_id ON chat_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions(created_at);

-- ─── chat_messages ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  direction TEXT NOT NULL, -- 'inbound' | 'outbound'
  body TEXT NOT NULL,
  wa_message_id TEXT,
  status TEXT NOT NULL DEFAULT 'sent',
  created_at TEXT NOT NULL,
  FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_wa_msg_id ON chat_messages(wa_message_id) WHERE wa_message_id IS NOT NULL;