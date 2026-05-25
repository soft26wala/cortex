// src/modules/flows/flows.router.ts
import { Router } from 'express'
import { requireAuth } from '../../auth/auth.middleware'
import { validate } from '../../shared/validate'
import { z } from 'zod'
import { db } from '../../config/db'
import { redis } from '../../config/redis'
import { FlowCompiler } from './compiler/flow-compiler'
import { logger } from '../../shared/logger'

const router = Router()
router.use(requireAuth)

const CreateFlowSchema = z.object({
  name:     z.string().min(1),
  clientId: z.string(),
  data:     z.record(z.any()),
})

const UpdateFlowSchema = z.object({
  name:     z.string().min(1).optional(),
  data:     z.record(z.any()).optional(),
  isActive: z.boolean().optional(),
})

// ─────────────────────────────────────────────────────────────────────
// LIST FLOWS (with pagination)
// ─────────────────────────────────────────────────────────────────────

router.get('/', async (req, res) => {
  const { clientId, isActive, page = '1', limit = '50' } = req.query as Record<string, string>
  if (!clientId) return res.status(400).json({ error: 'clientId required' })

  const offset = (Number(page) - 1) * Number(limit)
  let where = 'WHERE client_id = $1'
  const params: any[] = [clientId]

  if (isActive === 'true') {
    where += ` AND is_active = TRUE`
  } else if (isActive === 'false') {
    where += ` AND is_active = FALSE`
  }

  const [rows, count] = await Promise.all([
    db.query(
      `SELECT id, client_id, name, description, is_active, version, created_at, updated_at
       FROM flows ${where} ORDER BY updated_at DESC LIMIT $2 OFFSET $3`,
      [...params, Number(limit), offset]
    ),
    db.query(`SELECT COUNT(*) FROM flows ${where}`, params),
  ])

  res.json({
    flows: rows.rows,
    total: Number(count.rows[0].count),
    page: Number(page),
  })
})

// ─────────────────────────────────────────────────────────────────────
// GET SINGLE FLOW (full data)
// ─────────────────────────────────────────────────────────────────────

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const result = await db.query(
    `SELECT * FROM flows WHERE id = $1`,
    [id]
  )
  if (!result.rows[0]) return res.status(404).json({ error: 'Not found' })
  res.json(result.rows[0])
})

// ─────────────────────────────────────────────────────────────────────
// CREATE FLOW
// ─────────────────────────────────────────────────────────────────────

router.post(
  '/',
  validate(CreateFlowSchema),
  async (req, res) => {
    const { name, clientId, data } = req.body

    const result = await db.query(
      `INSERT INTO flows (user_id, client_id, name, data, is_active, version)
       VALUES ($1, $2, $3, $4::jsonb, TRUE, 1)
       RETURNING *`,
      [req.auth.userId, clientId, name, JSON.stringify(data)]
    )

    const flow = result.rows[0]

    // Cache
    await redis.setex(`flow:${flow.id}`, 300, JSON.stringify(flow.data))

    res.status(201).json(flow)
  }
)

// ─────────────────────────────────────────────────────────────────────
// UPDATE FLOW (with versioning & cache invalidation)
// ─────────────────────────────────────────────────────────────────────

router.patch(
  '/:id',
  validate(UpdateFlowSchema),
  async (req, res) => {
    const { id } = req.params
    const { name, data, isActive } = req.body

    const setClauses: string[] = ['updated_at = NOW()']
    const params: any[] = []
    let i = 1

    if (name !== undefined) {
      setClauses.push(`name = $${i++}`)
      params.push(name)
    }

    if (data !== undefined) {
      setClauses.push(`data = $${i++}::jsonb`)
      setClauses.push(`version = version + 1`)
      params.push(JSON.stringify(data))
    }

    if (isActive !== undefined) {
      setClauses.push(`is_active = $${i++}`)
      params.push(isActive)
    }

    params.push(id)

    const result = await db.query(
      `UPDATE flows SET ${setClauses.join(', ')}
       WHERE id = $${i}
       RETURNING *`,
      params
    )

    if (!result.rows[0]) return res.status(404).json({ error: 'Not found' })

    const flow = result.rows[0]

    // Invalidate cache
    await redis.del(`flow:${id}`)
    await redis.del(`flow:active:${flow.client_id}`)
    await redis.del(`trigger-index:${flow.client_id}`)

    logger.info({ flowId: id, version: flow.version }, 'Flow updated')

    res.json(flow)
  }
)

// ─────────────────────────────────────────────────────────────────────
// COMPILE FLOW TO META FORMAT
// ─────────────────────────────────────────────────────────────────────

router.post('/:id/compile', async (req, res) => {
  const { id } = req.params

  const result = await db.query(`SELECT data FROM flows WHERE id = $1`, [id])
  if (!result.rows[0]) return res.status(404).json({ error: 'Not found' })

  const flow = result.rows[0].data
  const compiler = new FlowCompiler()
  const compiled = compiler.compileToMetaFlow(flow)

  // Cache compiled version
  await db.query(
    `UPDATE flows SET compiled = $1::jsonb WHERE id = $2`,
    [JSON.stringify(compiled), id]
  )

  res.json(compiled)
})

// ─────────────────────────────────────────────────────────────────────
// ACTIVATE FLOW (make it the active one)
// ─────────────────────────────────────────────────────────────────────

router.post('/:id/activate', async (req, res) => {
  const { id } = req.params

  const flowRes = await db.query(`SELECT client_id FROM flows WHERE id = $1`, [id])
  if (!flowRes.rows[0]) return res.status(404).json({ error: 'Not found' })

  const clientId = flowRes.rows[0].client_id

  // Deactivate all others for this client
  await db.query(`UPDATE flows SET is_active = FALSE WHERE client_id = $1`, [clientId])

  // Activate this one
  await db.query(`UPDATE flows SET is_active = TRUE WHERE id = $1`, [id])

  // Invalidate cache
  await redis.del(`flow:active:${clientId}`)
  await redis.del(`trigger-index:${clientId}`)

  res.json({ status: 'activated' })
})

// ─────────────────────────────────────────────────────────────────────
// DUPLICATE FLOW
// ─────────────────────────────────────────────────────────────────────

router.post('/:id/duplicate', async (req, res) => {
  const { id } = req.params
  const { name = 'Copy' } = req.body

  const original = await db.query(
    `SELECT client_id, data FROM flows WHERE id = $1`,
    [id]
  )
  if (!original.rows[0]) return res.status(404).json({ error: 'Not found' })

  const { client_id, data } = original.rows[0]

  const dup = await db.query(
    `INSERT INTO flows (user_id, client_id, name, data, is_active)
     VALUES ($1, $2, $3, $4::jsonb, FALSE)
     RETURNING *`,
    [req.auth.userId, client_id, name, JSON.stringify(data)]
  )

  res.json(dup.rows[0])
})

// ─────────────────────────────────────────────────────────────────────
// DELETE FLOW
// ─────────────────────────────────────────────────────────────────────

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const flowRes = await db.query(`SELECT client_id, is_active FROM flows WHERE id = $1`, [id])
  if (!flowRes.rows[0]) return res.status(404).json({ error: 'Not found' })

  if (flowRes.rows[0].is_active) {
    return res.status(400).json({ error: 'Cannot delete active flow. Deactivate first.' })
  }

  await db.query(`DELETE FROM flows WHERE id = $1`, [id])

  // Invalidate cache
  await redis.del(`flow:${id}`)

  res.json({ success: true })
})

// ─────────────────────────────────────────────────────────────────────
// GET FLOW VERSION HISTORY (optional—for audit)
// ─────────────────────────────────────────────────────────────────────

router.get('/:id/versions', async (req, res) => {
  const { id } = req.params

  const result = await db.query(
    `SELECT version, updated_at FROM flows WHERE id = $1`,
    [id]
  )
  if (!result.rows[0]) return res.status(404).json({ error: 'Not found' })

  res.json({ flowId: id, versions: [result.rows[0]] })
})

export default router