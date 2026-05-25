// src/modules/clients/clients.router.ts
import { Router } from 'express'
import { requireAuth, requireRole } from '../auth/auth.middleware'
import { validate } from '../../shared/validate'
import { z } from 'zod'
import { db } from '../../config/db'
import { redis } from '../../config/redis'
import { encrypt, decrypt } from '../../shared/crypto'
import { logger } from '../../shared/logger'

const router = Router()
router.use(requireAuth)

const CreateClientSchema = z.object({
  name:          z.string().min(1),
  slug:          z.string().regex(/^[a-z0-9-]+$/),
  phoneNumberId: z.string(),
  waBusinessId:  z.string(),
  accessToken:   z.string(),
  verifyToken:   z.string(),
  planId:        z.string(),
  timezone:      z.string().default('UTC'),
})

const UpdateClientSchema = z.object({
  name:       z.string().min(1).optional(),
  timezone:   z.string().optional(),
  planId:     z.string().optional(),
  isActive:   z.boolean().optional(),
})

// ─────────────────────────────────────────────────────────────────────
// LIST CLIENTS (user's clients)
// ─────────────────────────────────────────────────────────────────────

router.get('/', async (req, res) => {
  const { page = '1', limit = '50' } = req.query as Record<string, string>
  const offset = (Number(page) - 1) * Number(limit)

  const [rows, count] = await Promise.all([
    db.query(
      `SELECT c.*, p.name as plan_name, p.monthly_message_limit as monthly_limit
       FROM clients c
       LEFT JOIN plans p ON c.plan_id = p.id
       WHERE c.user_id = $1
       ORDER BY c.created_at DESC
       LIMIT $2 OFFSET $3`,
      [req.auth.userId, Number(limit), offset]
    ),
    db.query(`SELECT COUNT(*) FROM clients WHERE user_id = $1`, [req.auth.userId]),
  ])

  res.json({
    clients: rows.rows.map((r: any) => ({
      ...r,
      access_token: r.access_token ? '[ENCRYPTED]' : null,
    })),
    total: Number(count.rows[0].count),
    page: Number(page),
  })
})

// ─────────────────────────────────────────────────────────────────────
// GET CLIENT BY SLUG (public route for webhook routing)
// ─────────────────────────────────────────────────────────────────────

router.get('/slug/:slug', async (req, res) => {
  const { slug } = req.params
  const result = await db.query(
    `SELECT * FROM clients WHERE slug = $1 AND is_active = TRUE`,
    [slug]
  )
  if (!result.rows[0]) return res.status(404).json({ error: 'Not found' })
  const client = result.rows[0]
  res.json({
    ...client,
    access_token: '[ENCRYPTED]',
  })
})

// ─────────────────────────────────────────────────────────────────────
// GET SINGLE CLIENT
// ─────────────────────────────────────────────────────────────────────

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const result = await db.query(
    `SELECT c.*, p.name as plan_name, p.monthly_message_limit as monthly_limit
     FROM clients c
     LEFT JOIN plans p ON c.plan_id = p.id
     WHERE c.id = $1`,
    [id]
  )
  if (!result.rows[0]) return res.status(404).json({ error: 'Not found' })
  const client = result.rows[0]
  res.json({
    ...client,
    access_token: '[ENCRYPTED]',
  })
})

// ─────────────────────────────────────────────────────────────────────
// CREATE CLIENT
// ─────────────────────────────────────────────────────────────────────

router.post(
  '/',
  validate(CreateClientSchema),
  async (req, res) => {
    const { name, slug, phoneNumberId, waBusinessId, accessToken, verifyToken, planId, timezone } =
      req.body

    // Check slug uniqueness
    const existing = await db.query(`SELECT id FROM clients WHERE slug = $1`, [slug])
    if (existing.rows[0]) {
      return res.status(400).json({ error: 'Slug already taken' })
    }

    // Encrypt access token
    const encrypted = encrypt(accessToken)

    const result = await db.query(
      `INSERT INTO clients (user_id, plan_id, name, slug, phone_number_id, wa_business_id, access_token, verify_token, timezone)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        req.auth.userId,
        planId,
        name,
        slug,
        phoneNumberId,
        waBusinessId,
        encrypted,
        verifyToken,
        timezone,
      ]
    )

    logger.info({ clientId: result.rows[0].id, slug }, 'Client created')

    res.status(201).json({
      ...result.rows[0],
      access_token: '[ENCRYPTED]',
    })
  }
)

// ─────────────────────────────────────────────────────────────────────
// UPDATE CLIENT
// ─────────────────────────────────────────────────────────────────────

router.patch(
  '/:id',
  validate(UpdateClientSchema),
  async (req, res) => {
    const { id } = req.params
    const { name, timezone, planId, isActive } = req.body

    const setClauses: string[] = ['updated_at = NOW()']
    const params: any[] = []
    let i = 1

    if (name !== undefined) {
      setClauses.push(`name = $${i++}`)
      params.push(name)
    }
    if (timezone !== undefined) {
      setClauses.push(`timezone = $${i++}`)
      params.push(timezone)
    }
    if (planId !== undefined) {
      setClauses.push(`plan_id = $${i++}`)
      params.push(planId)
    }
    if (isActive !== undefined) {
      setClauses.push(`is_active = $${i++}`)
      params.push(isActive)
    }

    params.push(id)

    const result = await db.query(
      `UPDATE clients SET ${setClauses.join(', ')}
       WHERE id = $${i}
       RETURNING *`,
      params
    )

    if (!result.rows[0]) return res.status(404).json({ error: 'Not found' })

    res.json({
      ...result.rows[0],
      access_token: '[ENCRYPTED]',
    })
  }
)

// ─────────────────────────────────────────────────────────────────────
// ROTATE ACCESS TOKEN
// ─────────────────────────────────────────────────────────────────────

router.post('/:id/rotate-token', async (req, res) => {
  const { id } = req.params
  const { newAccessToken } = req.body

  if (!newAccessToken) {
    return res.status(400).json({ error: 'newAccessToken required' })
  }

  const encrypted = encrypt(newAccessToken)
  const result = await db.query(
    `UPDATE clients SET access_token = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [encrypted, id]
  )

  if (!result.rows[0]) return res.status(404).json({ error: 'Not found' })

  logger.info({ clientId: id }, 'Access token rotated')

  res.json({
    ...result.rows[0],
    access_token: '[ENCRYPTED]',
  })
})

// ─────────────────────────────────────────────────────────────────────
// GET DECRYPTED TOKEN (admin only, sensitive!)
// ─────────────────────────────────────────────────────────────────────

router.get('/:id/token', requireRole('admin', 'superadmin'), async (req, res) => {
  const { id } = req.params
  const result = await db.query(
    `SELECT id, access_token FROM clients WHERE id = $1`,
    [id]
  )
  if (!result.rows[0]) return res.status(404).json({ error: 'Not found' })

  const decrypted = decrypt(result.rows[0].access_token)
  logger.warn({ clientId: id, userId: req.auth.userId }, 'Sensitive token accessed')

  res.json({ clientId: id, accessToken: decrypted })
})

// ─────────────────────────────────────────────────────────────────────
// DELETE CLIENT
// ─────────────────────────────────────────────────────────────────────

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  // Soft delete: just deactivate
  await db.query(`UPDATE clients SET is_active = FALSE, updated_at = NOW() WHERE id = $1`, [id])

  // Invalidate caches
  await redis.del(`flow:active:${id}`)
  await redis.del(`quota:${id}`)

  res.json({ success: true })
})

// ─────────────────────────────────────────────────────────────────────
// USAGE STATS
// ─────────────────────────────────────────────────────────────────────

router.get('/:id/usage', async (req, res) => {
  const { id } = req.params
  const { days = '30' } = req.query as Record<string, string>

  const result = await db.query(
    `SELECT
       COUNT(*) FILTER (WHERE direction = 'outbound') as messages_sent,
       COUNT(*) FILTER (WHERE direction = 'inbound')  as messages_received,
       COUNT(*) FILTER (WHERE status = 'failed')      as messages_failed,
       COUNT(DISTINCT contact_id) as unique_contacts
     FROM messages
     WHERE client_id = $1
       AND created_at > NOW() - ($2 || ' days')::INTERVAL`,
    [id, days]
  )

  res.json(result.rows[0])
})

export default router