-- ─────────────────────────────────────────────────────
-- MULTI-TENANT SAAS SCHEMA
-- ─────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for trigger text search

-- USERS (admin / agency owners)
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin','admin','viewer')),
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PLANS
CREATE TABLE plans (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                  TEXT NOT NULL,          -- Starter, Pro, Business
  monthly_message_limit INT  NOT NULL,
  max_flows             INT  NOT NULL,
  max_contacts          INT  NOT NULL,
  ai_nodes_enabled      BOOLEAN NOT NULL DEFAULT FALSE,
  broadcast_enabled     BOOLEAN NOT NULL DEFAULT FALSE,
  price_usd_cents       INT NOT NULL DEFAULT 0,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CLIENTS (each WhatsApp business number)
CREATE TABLE clients (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id          UUID NOT NULL REFERENCES plans(id),
  name             TEXT NOT NULL,
  slug             TEXT UNIQUE NOT NULL,         -- URL-safe identifier
  phone_number_id  TEXT UNIQUE NOT NULL,         -- Meta phone_number_id
  wa_business_id   TEXT NOT NULL,
  access_token     TEXT NOT NULL,                -- encrypted in prod
  verify_token     TEXT NOT NULL,
  -- billing
  messages_sent_this_month INT NOT NULL DEFAULT 0,
  billing_cycle_start      DATE NOT NULL DEFAULT CURRENT_DATE,
  plan_expires_at          TIMESTAMPTZ,
  is_active                BOOLEAN NOT NULL DEFAULT TRUE,
  -- metadata
  timezone         TEXT NOT NULL DEFAULT 'UTC',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_clients_phone ON clients(phone_number_id);
CREATE INDEX idx_clients_user  ON clients(user_id);

-- FLOWS
CREATE TABLE flows (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id   UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id),
  name        TEXT NOT NULL,
  description TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  version     INT NOT NULL DEFAULT 1,
  data        JSONB NOT NULL,     -- full flow graph
  compiled    JSONB,              -- cached Meta Flow JSON
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (client_id, name)
);
CREATE INDEX idx_flows_client      ON flows(client_id);
CREATE INDEX idx_flows_active      ON flows(client_id, is_active);
CREATE INDEX idx_flows_data_gin    ON flows USING gin(data);

-- CONTACTS
CREATE TABLE contacts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id   UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  phone       TEXT NOT NULL,          -- E.164 format
  name        TEXT,
  email       TEXT,
  tags        TEXT[] NOT NULL DEFAULT '{}',
  attributes  JSONB NOT NULL DEFAULT '{}',  -- CRM fields
  opted_in    BOOLEAN NOT NULL DEFAULT TRUE,
  opted_in_at TIMESTAMPTZ,
  last_seen   TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (client_id, phone)
);
CREATE INDEX idx_contacts_client ON contacts(client_id);
CREATE INDEX idx_contacts_phone  ON contacts(client_id, phone);
CREATE INDEX idx_contacts_tags   ON contacts USING gin(tags);

-- SESSIONS (active user conversations)
CREATE TABLE sessions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id       UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  contact_id      UUID REFERENCES contacts(id),
  phone           TEXT NOT NULL,
  flow_id         UUID REFERENCES flows(id),
  current_node_id TEXT,
  state           JSONB NOT NULL DEFAULT '{}',   -- variables, form data
  status          TEXT NOT NULL DEFAULT 'active' 
                  CHECK (status IN ('active','waiting_input','completed','expired')),
  expires_at      TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (client_id, phone)
);
CREATE INDEX idx_sessions_client  ON sessions(client_id, phone);
CREATE INDEX idx_sessions_status  ON sessions(status, expires_at);

-- MESSAGES LOG
CREATE TABLE messages (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id       UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  contact_id      UUID REFERENCES contacts(id),
  session_id      UUID REFERENCES sessions(id),
  direction       TEXT NOT NULL CHECK (direction IN ('inbound','outbound')),
  type            TEXT NOT NULL,   -- text, image, button, interactive, template
  content         JSONB NOT NULL,
  wa_message_id   TEXT,            -- Meta's message ID for status updates
  status          TEXT NOT NULL DEFAULT 'queued'
                  CHECK (status IN ('queued','sent','delivered','read','failed')),
  error           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_messages_client    ON messages(client_id, created_at DESC);
CREATE INDEX idx_messages_contact   ON messages(contact_id, created_at DESC);
CREATE INDEX idx_messages_wa_id     ON messages(wa_message_id) WHERE wa_message_id IS NOT NULL;

-- BROADCASTS
CREATE TABLE broadcasts (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id     UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  template_id   TEXT,              -- Meta template name
  flow_id       UUID REFERENCES flows(id),
  target_tags   TEXT[],            -- filter contacts by tags
  target_phones TEXT[],            -- explicit phone list
  total_count   INT NOT NULL DEFAULT 0,
  sent_count    INT NOT NULL DEFAULT 0,
  failed_count  INT NOT NULL DEFAULT 0,
  status        TEXT NOT NULL DEFAULT 'draft'
                CHECK (status IN ('draft','scheduled','running','completed','cancelled')),
  scheduled_at  TIMESTAMPTZ,
  started_at    TIMESTAMPTZ,
  completed_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ANALYTICS EVENTS
CREATE TABLE analytics_events (
  id         BIGSERIAL PRIMARY KEY,
  client_id  UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,   -- message_sent, message_read, flow_started, node_executed, etc.
  flow_id    UUID,
  node_id    TEXT,
  contact_id UUID,
  metadata   JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_analytics_client_time ON analytics_events(client_id, created_at DESC);
CREATE INDEX idx_analytics_event_type  ON analytics_events(client_id, event_type, created_at DESC);
-- For high volume, partition this table by month:
-- PARTITION BY RANGE (created_at)


ALTER TABLE flows    ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_isolation ON flows
  USING (client_id = current_setting('app.current_client_id')::uuid);


  -- Partition messages by month for high-volume tables
CREATE TABLE messages_2025_01 PARTITION OF messages
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Or use TimescaleDB for analytics_events:
SELECT create_hypertable('analytics_events', 'created_at');


