// src/modules/plans/plans.router.ts
import { Router } from 'express'
import { requireRole } from '../auth/auth.middleware'
import { validate } from '../../shared/validate'
import { z } from 'zod'
import { db } from '../../config/db'

const router = Router()

const CreatePlanSchema = z.object({
  name:                  z.string(),
  monthlyMessageLimit:   z.number().int().positive(),
  maxFlows:              z.number().int().positive(),
  maxContacts:           z.number().int().positive(),
  aiNodesEnabled:        z.boolean(),
  broadcastEnabled:      z.boolean(),
  priceUsdCents:         z.number().int().nonnegative(),
})

// ─────────────────────────────────────────────────────────────────────
// LIST PLANS (public)
// ─────────────────────────────────────────────────────────────────────

router.get('/', async (req, res) => {
  const result = await db.query(`SELECT * FROM plans ORDER BY price_usd_cents ASC`)
  res.json(result.rows)
})

// ─────────────────────────────────────────────────────────────────────
// CREATE PLAN (admin only)
// ─────────────────────────────────────────────────────────────────────

router.post(
  '/',
  requireRole('superadmin'),
  validate(CreatePlanSchema),
  async (req, res) => {
    const {
      name,
      monthlyMessageLimit,
      maxFlows,
      maxContacts,
      aiNodesEnabled,
      broadcastEnabled,
      priceUsdCents,
    } = req.body

    const result = await db.query(
      `INSERT INTO plans (name, monthly_message_limit, max_flows, max_contacts, ai_nodes_enabled, broadcast_enabled, price_usd_cents)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        name,
        monthlyMessageLimit,
        maxFlows,
        maxContacts,
        aiNodesEnabled,
        broadcastEnabled,
        priceUsdCents,
      ]
    )

    res.status(201).json(result.rows[0])
  }
)

// ─────────────────────────────────────────────────────────────────────
// UPDATE PLAN (admin only)
// ─────────────────────────────────────────────────────────────────────

router.patch(
  '/:id',
  requireRole('superadmin'),
  async (req, res) => {
    const { id } = req.params
    const updates = req.body

    const setClauses = Object.keys(updates)
      .map((k, i) => `${k} = $${i + 1}`)
      .join(', ')

    if (!setClauses) return res.json(await db.query(`SELECT * FROM plans WHERE id = $1`, [id]))

    const result = await db.query(
      `UPDATE plans SET ${setClauses} WHERE id = $${Object.keys(updates).length + 1} RETURNING *`,
      [...Object.values(updates), id]
    )

    res.json(result.rows[0])
  }
)

// ─────────────────────────────────────────────────────────────────────
// DELETE PLAN (admin only)
// ─────────────────────────────────────────────────────────────────────

router.delete('/:id', requireRole('superadmin'), async (req, res) => {
  const { id } = req.params
  const clientCount = await db.query(`SELECT COUNT(*) FROM clients WHERE plan_id = $1`, [id])

  if (Number(clientCount.rows[0].count) > 0) {
    return res.status(400).json({ error: 'Cannot delete plan with active clients' })
  }

  await db.query(`DELETE FROM plans WHERE id = $1`, [id])
  res.json({ success: true })
})

export default router