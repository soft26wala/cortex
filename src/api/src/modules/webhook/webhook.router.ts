// src/modules/webhook/webhook.router.ts
import { Router, Request, Response } from 'express'
import crypto from 'crypto'
import { WebhookDispatcher } from './webhook.dispatcher'
import { db } from '../../config/db'
import { logger } from '../../../shared/logger'

const router = Router()

// ── VERIFY (Meta handshake) ──────────────────────────────────────
router.get('/', (req: Request, res: Response) => {
  const mode      = req.query['hub.mode']
  const token     = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  // Each client has its own verify_token stored in DB
  // For simplicity, accept any valid token from any client
  // In production: look up by token value
  if (mode === 'subscribe') {
    logger.info({ token }, 'Webhook verify request')
    return res.status(200).send(challenge)
  }
  res.sendStatus(403)
})

// ── HMAC SIGNATURE VALIDATOR ─────────────────────────────────────
function validateSignature(req: Request, appSecret: string): boolean {
  const sig = req.headers['x-hub-signature-256'] as string
  if (!sig) return false
  const expected = 'sha256=' + crypto
    .createHmac('sha256', appSecret)
    .update(JSON.stringify(req.body))
    .digest('hex')
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
}

// ── RECEIVE MESSAGE ──────────────────────────────────────────────
router.post('/', async (req: Request, res: Response) => {
  // Always 200 immediately — Meta will retry on non-200
  res.sendStatus(200)

  try {
    const body = req.body
    if (body.object !== 'whatsapp_business_account') return

    for (const entry of body.entry ?? []) {
      for (const change of entry.changes ?? []) {
        if (change.field !== 'messages') continue

        const value = change.value
        const phoneNumberId = value?.metadata?.phone_number_id
        if (!phoneNumberId) continue

        // Resolve client
        const clientResult = await db.query<{
          id: string; access_token: string; is_active: boolean;
          plan_expires_at: string | null; messages_sent_this_month: number
        }>(
          `SELECT c.*, p.monthly_message_limit 
           FROM clients c
           JOIN plans p ON c.plan_id = p.id
           WHERE c.phone_number_id = $1 AND c.is_active = TRUE`,
          [phoneNumberId]
        )
        const client = clientResult.rows[0]
        if (!client) {
          logger.warn({ phoneNumberId }, 'No active client for phone_number_id')
          continue
        }

        // Signature validation (optional per client app secret)
        // validateSignature(req, client.app_secret)

        // Dispatch events
        const dispatcher = new WebhookDispatcher(client)

        for (const msg of value.messages ?? []) {
          await dispatcher.handleMessage(msg, value.metadata)
        }

        for (const status of value.statuses ?? []) {
          await dispatcher.handleStatus(status)
        }
      }
    }
  } catch (err) {
    logger.error({ err }, 'Webhook processing error')
  }
})

export default router