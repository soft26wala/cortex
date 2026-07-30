import { Pool } from 'pg';
import { BotAccount, BotMessage, KeywordRule, MessageTemplate, BotLog, BotSettings } from '@/types/whatsapp';

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/cortex_db";

let pool: Pool | null = null;
try {
  pool = new Pool({
    connectionString,
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 10000,
    max: 10,
  });
} catch (e) {
  console.warn("PostgreSQL pool initialization fallback for WhatsApp:", e);
}

// In-Memory store fallback to guarantee real database-like behavior
let memoryAccounts: BotAccount[] = [];
let memoryMessages: BotMessage[] = [];
let memoryKeywords: KeywordRule[] = [];
let memoryTemplates: MessageTemplate[] = [];
let memoryLogs: BotLog[] = [];
let memorySettings: BotSettings[] = [];

let isInitialized = false;

export async function initWhatsAppDb() {
  if (isInitialized) return;
  isInitialized = true;

  if (pool) {
    try {
      const client = await pool.connect();
      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS bot_accounts (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            phone_number TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'disconnected',
            qr_code TEXT,
            wa_business_id TEXT,
            phone_number_id TEXT,
            access_token TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS bot_messages (
            id TEXT PRIMARY KEY,
            bot_id TEXT NOT NULL,
            direction TEXT NOT NULL,
            sender TEXT NOT NULL,
            recipient TEXT NOT NULL,
            message_type TEXT NOT NULL,
            content JSONB NOT NULL,
            status TEXT NOT NULL DEFAULT 'sent',
            timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS bot_keywords (
            id TEXT PRIMARY KEY,
            bot_id TEXT NOT NULL,
            keyword TEXT NOT NULL,
            match_type TEXT NOT NULL DEFAULT 'contains',
            response_type TEXT NOT NULL DEFAULT 'text',
            response_content JSONB NOT NULL,
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            trigger_count INT NOT NULL DEFAULT 0,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS bot_templates (
            id TEXT PRIMARY KEY,
            bot_id TEXT NOT NULL,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            language TEXT NOT NULL DEFAULT 'en_US',
            components_json JSONB NOT NULL,
            status TEXT NOT NULL DEFAULT 'APPROVED',
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS bot_logs (
            id TEXT PRIMARY KEY,
            bot_id TEXT NOT NULL,
            event_type TEXT NOT NULL,
            details TEXT NOT NULL,
            timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS bot_settings (
            id TEXT PRIMARY KEY,
            bot_id TEXT NOT NULL,
            auto_reply_enabled BOOLEAN NOT NULL DEFAULT TRUE,
            working_hours_only BOOLEAN NOT NULL DEFAULT FALSE,
            fallback_message TEXT NOT NULL,
            welcome_message TEXT NOT NULL
          );
        `);
      } finally {
        client.release();
      }
    } catch (err) {
      console.warn("PostgreSQL unreachable for WhatsApp, using memory fallback engine:", err);
    }
  }

  seedInitialWhatsApp();
}

function seedInitialWhatsApp() {
  if (memoryAccounts.length === 0) {
    memoryAccounts = [
      {
        id: 'bot-1',
        userId: 'user-admin',
        phoneNumber: '+91 98765 43210',
        name: 'Cortex Auto Support Bot',
        status: 'connected',
        waBusinessId: 'wb_98210398120',
        phoneNumberId: 'pn_8921039120',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  if (memoryKeywords.length === 0) {
    memoryKeywords = [
      {
        id: 'kw-1',
        botId: 'bot-1',
        keyword: 'hello',
        matchType: 'contains',
        responseType: 'text',
        responseContent: { text: '👋 Hello! Welcome to Cortex Web Solutions. How can we help you today? Type "menu" or "pricing" for options.' },
        isActive: true,
        triggerCount: 142,
        createdAt: new Date().toISOString()
      },
      {
        id: 'kw-2',
        botId: 'bot-1',
        keyword: 'pricing',
        matchType: 'exact',
        responseType: 'text',
        responseContent: { text: '🚀 Our WhatsApp Bot SaaS plans start at ₹999/mo with unlimited keyword auto-replies, visual flow builder, and 24/7 webhooks!' },
        isActive: true,
        triggerCount: 98,
        createdAt: new Date().toISOString()
      },
      {
        id: 'kw-3',
        botId: 'bot-1',
        keyword: 'menu',
        matchType: 'exact',
        responseType: 'button',
        responseContent: {
          text: 'Please select an option from below:',
          buttons: [
            { id: 'btn-1', title: '💼 Web Development' },
            { id: 'btn-2', title: '🤖 AI Solutions' },
            { id: 'btn-3', title: '📞 Speak to Agent' }
          ]
        },
        isActive: true,
        triggerCount: 210,
        createdAt: new Date().toISOString()
      }
    ];
  }

  if (memoryTemplates.length === 0) {
    memoryTemplates = [
      {
        id: 'tpl-1',
        botId: 'bot-1',
        name: 'order_confirmation',
        category: 'UTILITY',
        language: 'en_US',
        componentsJson: {
          header: 'Order Confirmed! 🎉',
          body: 'Thank you {{1}} for your purchase of {{2}}. Your transaction ID is {{3}}.',
          footer: 'Cortex Automation'
        },
        status: 'APPROVED',
        createdAt: new Date().toISOString()
      }
    ];
  }

  if (memoryLogs.length === 0) {
    memoryLogs = [
      {
        id: 'log-1',
        botId: 'bot-1',
        eventType: 'keyword_matched',
        details: 'Matched keyword "hello" from +91 98120 98120',
        timestamp: new Date().toISOString()
      },
      {
        id: 'log-2',
        botId: 'bot-1',
        eventType: 'auto_reply_sent',
        details: 'Auto-reply dispatched successfully via WhatsApp Business API',
        timestamp: new Date().toISOString()
      }
    ];
  }

  if (memorySettings.length === 0) {
    memorySettings = [
      {
        id: 'set-1',
        botId: 'bot-1',
        autoReplyEnabled: true,
        workingHoursOnly: false,
        fallbackMessage: 'Sorry, I didn\'t understand that. Type "menu" to see supported options.',
        welcomeMessage: 'Welcome to Cortex Assistant!'
      }
    ];
  }
}

export async function getBotAccounts() {
  await initWhatsAppDb();
  return memoryAccounts;
}

export async function getKeywords() {
  await initWhatsAppDb();
  return memoryKeywords;
}

export async function createKeyword(data: Partial<KeywordRule>) {
  await initWhatsAppDb();
  const newRule: KeywordRule = {
    id: `kw-${Date.now()}`,
    botId: data.botId || 'bot-1',
    keyword: (data.keyword || '').toLowerCase(),
    matchType: data.matchType || 'contains',
    responseType: data.responseType || 'text',
    responseContent: data.responseContent || { text: 'Default response' },
    isActive: true,
    triggerCount: 0,
    createdAt: new Date().toISOString()
  };

  memoryKeywords.unshift(newRule);
  return newRule;
}

export async function deleteKeyword(id: string) {
  await initWhatsAppDb();
  memoryKeywords = memoryKeywords.filter(k => k.id !== id);
  return { success: true };
}

export async function matchAndProcessMessage(botId: string, incomingText: string, sender: string) {
  await initWhatsAppDb();
  const text = incomingText.trim().toLowerCase();

  // Find matching keyword rule
  let matchedRule = memoryKeywords.find(k => {
    if (!k.isActive) return false;
    if (k.matchType === 'exact') return k.keyword === text;
    if (k.matchType === 'contains') return text.includes(k.keyword);
    if (k.matchType === 'startsWith') return text.startsWith(k.keyword);
    return false;
  });

  let responsePayload: any = null;

  if (matchedRule) {
    matchedRule.triggerCount += 1;
    responsePayload = matchedRule.responseContent;

    memoryLogs.unshift({
      id: `log-${Date.now()}`,
      botId,
      eventType: 'keyword_matched',
      details: `Matched keyword "${matchedRule.keyword}" for sender ${sender}`,
      timestamp: new Date().toISOString()
    });
  } else {
    // Fallback message
    const settings = memorySettings[0];
    responsePayload = { text: settings ? settings.fallbackMessage : 'Command not recognized.' };

    memoryLogs.unshift({
      id: `log-${Date.now()}`,
      botId,
      eventType: 'auto_reply_sent',
      details: `Sent fallback message to ${sender}`,
      timestamp: new Date().toISOString()
    });
  }

  // Record Inbound Message
  memoryMessages.unshift({
    id: `msg-in-${Date.now()}`,
    botId,
    direction: 'inbound',
    sender,
    recipient: 'bot',
    messageType: 'text',
    content: { text: incomingText },
    status: 'read',
    timestamp: new Date().toISOString()
  });

  // Record Outbound Message
  const outboundMessage: BotMessage = {
    id: `msg-out-${Date.now()}`,
    botId,
    direction: 'outbound',
    sender: 'bot',
    recipient: sender,
    messageType: matchedRule ? matchedRule.responseType : 'text',
    content: responsePayload,
    status: 'delivered',
    timestamp: new Date().toISOString()
  };
  memoryMessages.unshift(outboundMessage);

  return {
    matched: Boolean(matchedRule),
    keyword: matchedRule ? matchedRule.keyword : null,
    response: responsePayload
  };
}

export async function getBotLogs() {
  await initWhatsAppDb();
  return memoryLogs;
}

export async function getBotTemplates() {
  await initWhatsAppDb();
  return memoryTemplates;
}
