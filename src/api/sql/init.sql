# scripts/init.sql
-- ═════════════════════════════════════════════════════════════════════
-- FLOWWA DATABASE INITIALIZATION
-- ═════════════════════════════════════════════════════════════════════

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create schema_migrations table for tracking migrations
CREATE TABLE IF NOT EXISTS schema_migrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  applied_at TIMESTAMP DEFAULT NOW()
);

-- Insert initial migration record
INSERT INTO schema_migrations (name)
VALUES ('001_initial_schema')
ON CONFLICT DO NOTHING;

-- Log initialization
\echo 'FlowWA database initialized successfully'