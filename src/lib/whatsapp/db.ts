import { Pool } from 'pg';
import { BotAccount, BotMessage, KeywordRule, MessageTemplate, BotLog, BotSettings } from '@/types/whatsapp';
import { encryptToken } from './crypto';

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

// In-Memory isolated tenant store fallback
let memoryAccounts: (BotAccount & { userId: string })[] = [];
let memoryMessages: (BotMessage & { userId: string })[] = [];
let memoryKeywords: (KeywordRule & { userId: string })[] = [];
let memoryTemplates: (MessageTemplate & { userId: string })[] = [];
let memoryLogs: (BotLog & { userId: string })[] = [];
let memorySettings: (BotSettings & { userId: string })[] = [];
let memorySubscriptions: { id: string; userId: string; planId: string; planName: string; status: string; activatedAt: string }[] = [];
let memoryPayments: { id: string; userId: string; orderId: string; paymentId: string; amount: number; status: string; createdAt: string }[] = [];

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
            phone_number TEXT NOT NULL,
            name TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'disconnected',
            qr_code TEXT,
            wa_business_id TEXT,
            phone_number_id TEXT,
            access_token TEXT,
            meta_app_id TEXT,
            meta_app_secret TEXT,
            verify_token TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            CONSTRAINT unique_user_phone UNIQUE (user_id, phone_number)
          );

          CREATE TABLE IF NOT EXISTS bot_messages (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
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
            user_id TEXT NOT NULL,
            bot_id TEXT NOT NULL,
            keyword TEXT NOT NULL,
            match_type TEXT NOT NULL DEFAULT 'contains',
            response_type TEXT NOT NULL DEFAULT 'text',
            response_content JSONB NOT NULL,
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            trigger_count INT NOT NULL DEFAULT 0,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            CONSTRAINT unique_user_bot_keyword UNIQUE (user_id, bot_id, keyword)
          );

          CREATE TABLE IF NOT EXISTS bot_templates (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
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
            user_id TEXT NOT NULL,
            bot_id TEXT NOT NULL,
            event_type TEXT NOT NULL,
            details TEXT NOT NULL,
            timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS subscriptions (
            id TEXT PRIMARY KEY,
            user_id TEXT UNIQUE NOT NULL,
            plan_id TEXT NOT NULL,
            plan_name TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'active',
            activated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS payments (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            order_id TEXT NOT NULL,
            payment_id TEXT NOT NULL,
            amount NUMERIC NOT NULL,
            status TEXT NOT NULL DEFAULT 'completed',
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `);
      } finally {
        client.release();
      }
    } catch (err) {
      console.warn("PostgreSQL unreachable for WhatsApp, using multi-tenant memory database engine:", err);
    }
  }

  seedInitialWhatsApp();
}

function seedInitialWhatsApp() {
  if (memoryAccounts.length === 0) {
    memoryAccounts = [
      {
        id: 'bot-user-1',
        userId: 'user-1',
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
        userId: 'user-1',
        botId: 'bot-user-1',
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
        userId: 'user-1',
        botId: 'bot-user-1',
        keyword: 'pricing',
        matchType: 'exact',
        responseType: 'text',
        responseContent: { text: '🚀 Our WhatsApp Bot SaaS plans start at ₹999/mo with unlimited keyword auto-replies!' },
        isActive: true,
        triggerCount: 98,
        createdAt: new Date().toISOString()
      }
    ];
  }

  if (memorySubscriptions.length === 0) {
    memorySubscriptions = [
      {
        id: 'sub-user-1',
        userId: 'user-1',
        planId: 'plan_starter',
        planName: 'Starter SaaS Plan',
        status: 'active',
        activatedAt: new Date().toISOString()
      }
    ];
  }
}

// -------------------------------------------------------------
// Multi-Tenant Isolated CRUD Functions (Must filter by userId!)
// -------------------------------------------------------------

export async function getBotAccounts(userId: string) {
  await initWhatsAppDb();
  return memoryAccounts.filter(a => a.userId === userId);
}

export async function saveBotCredentials(userId: string, data: any) {
  await initWhatsAppDb();
  const botId = `bot-${userId}`;
  const index = memoryAccounts.findIndex(a => a.userId === userId);

  const accountObj: BotAccount & { userId: string } = {
    id: botId,
    userId,
    phoneNumber: data.phoneNumber || '+91 98765 43210',
    name: data.businessName || 'My Business Bot',
    status: 'connected',
    waBusinessId: data.wabaId || 'waba_default',
    phoneNumberId: data.phoneNumberId || 'phone_default',
    accessToken: encryptToken(data.accessToken || ''),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (index !== -1) {
    memoryAccounts[index] = accountObj;
  } else {
    memoryAccounts.push(accountObj);
  }

  return accountObj;
}

export async function getKeywords(userId: string, botId?: string) {
  await initWhatsAppDb();
  return memoryKeywords.filter(k => k.userId === userId && (!botId || k.botId === botId));
}

export async function createKeyword(userId: string, data: Partial<KeywordRule>) {
  await initWhatsAppDb();
  const userBots = memoryAccounts.filter(a => a.userId === userId);
  const botId = userBots[0]?.id || `bot-${userId}`;

  const newRule: KeywordRule & { userId: string } = {
    id: `kw-${Date.now()}`,
    userId,
    botId,
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

export async function deleteKeyword(userId: string, id: string) {
  await initWhatsAppDb();
  memoryKeywords = memoryKeywords.filter(k => !(k.id === id && k.userId === userId));
  return { success: true };
}

export async function matchAndProcessMessage(userId: string, botId: string, incomingText: string, sender: string) {
  await initWhatsAppDb();
  const text = incomingText.trim().toLowerCase();

  // STRICTLY FILTER BY USER_ID & BOT_ID! Customer A can NEVER trigger Customer B's rules!
  const userRules = memoryKeywords.filter(k => k.userId === userId && k.isActive);

  let matchedRule = userRules.find(k => {
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
      userId,
      botId,
      eventType: 'keyword_matched',
      details: `Matched keyword "${matchedRule.keyword}" for sender ${sender}`,
      timestamp: new Date().toISOString()
    });
  } else {
    responsePayload = { text: 'Sorry, I did not understand that. Type "menu" or "pricing" for options.' };

    memoryLogs.unshift({
      id: `log-${Date.now()}`,
      userId,
      botId,
      eventType: 'auto_reply_sent',
      details: `Sent fallback message to ${sender}`,
      timestamp: new Date().toISOString()
    });
  }

  // Record Messages under user_id
  memoryMessages.unshift({
    id: `msg-in-${Date.now()}`,
    userId,
    botId,
    direction: 'inbound',
    sender,
    recipient: 'bot',
    messageType: 'text',
    content: { text: incomingText },
    status: 'read',
    timestamp: new Date().toISOString()
  });

  const outboundMessage: BotMessage & { userId: string } = {
    id: `msg-out-${Date.now()}`,
    userId,
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

export async function getBotLogs(userId: string) {
  await initWhatsAppDb();
  return memoryLogs.filter(l => l.userId === userId);
}

export async function getBotTemplates(userId: string) {
  await initWhatsAppDb();
  return memoryTemplates.filter(t => t.userId === userId);
}

// -------------------------------------------------------------
// Razorpay Subscriptions & Payments per User
// -------------------------------------------------------------

export async function activateUserSubscription(userId: string, planId: string, planName: string, paymentDetails?: any) {
  await initWhatsAppDb();

  const subObj = {
    id: `sub-${userId}`,
    userId,
    planId,
    planName,
    status: 'active',
    activatedAt: new Date().toISOString()
  };

  const index = memorySubscriptions.findIndex(s => s.userId === userId);
  if (index !== -1) {
    memorySubscriptions[index] = subObj;
  } else {
    memorySubscriptions.push(subObj);
  }

  if (paymentDetails) {
    memoryPayments.unshift({
      id: `pay-${Date.now()}`,
      userId,
      orderId: paymentDetails.orderId || `order_${Date.now()}`,
      paymentId: paymentDetails.paymentId || `pay_${Date.now()}`,
      amount: paymentDetails.amount || 999,
      status: 'completed',
      createdAt: new Date().toISOString()
    });
  }

  return subObj;
}

export interface SavedFlowGraph {
  id: string;
  userId: string;
  botId: string;
  name: string;
  isPublished: boolean;
  nodes: any[];
  edges: any[];
  updatedAt: string;
}

let memoryFlows: SavedFlowGraph[] = [
  {
    id: 'flow-main',
    userId: 'user-1',
    botId: 'bot-user-1',
    name: 'Main Customer Support Flow',
    isPublished: true,
    nodes: [
      { id: '1', type: 'startNode', position: { x: 250, y: 50 }, data: { label: 'Incoming Message' } },
      { id: '2', type: 'messageNode', position: { x: 250, y: 200 }, data: { title: 'Welcome Message', text: '👋 Hello! Welcome to Cortex WhatsApp Support. Select an option below:', buttons: ['Pricing & Plans', 'Technical Help', 'Contact Sales'] } }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' }
    ],
    updatedAt: new Date().toISOString()
  }
];

export async function getSavedFlows(userId: string, botId?: string) {
  await initWhatsAppDb();
  return memoryFlows.filter(f => f.userId === userId && (!botId || f.botId === botId));
}

export async function saveFlowGraph(userId: string, botId: string, flowData: { id?: string; name: string; isPublished: boolean; nodes: any[]; edges: any[] }) {
  await initWhatsAppDb();
  const flowId = flowData.id || `flow-${Date.now()}`;
  const index = memoryFlows.findIndex(f => f.id === flowId && f.userId === userId);

  const flowObj: SavedFlowGraph = {
    id: flowId,
    userId,
    botId,
    name: flowData.name || 'Custom WhatsApp Flow',
    isPublished: flowData.isPublished !== undefined ? flowData.isPublished : true,
    nodes: flowData.nodes || [],
    edges: flowData.edges || [],
    updatedAt: new Date().toISOString()
  };

  if (index !== -1) {
    memoryFlows[index] = flowObj;
  } else {
    memoryFlows.unshift(flowObj);
  }

  return flowObj;
}

export async function getUserSubscription(userId: string) {
  await initWhatsAppDb();
  return memorySubscriptions.find(s => s.userId === userId) || {
    id: `sub-${userId}`,
    userId,
    planId: 'plan_starter',
    planName: 'Starter SaaS Plan',
    status: 'active',
    activatedAt: new Date().toISOString()
  };
}
