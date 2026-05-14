// src/modules/engine/flow-engine.ts
import { db } from '../../config/db'
import { redis } from '../../config/redis'
import { SessionManager } from './session-manager'
import { TriggerMatcher } from './trigger-matcher'
import { NodeExecutor } from './node-executor'
import { BillingService } from '../billing/billing.service'
import { logger } from '../../../shared/logger'
import type { FlowNode, FlowData, Session } from '../../types'

export class FlowEngine {
  private sessionManager: SessionManager
  private triggerMatcher: TriggerMatcher
  private nodeExecutor: NodeExecutor
  private billing: BillingService

  constructor(private client: any) {
    this.sessionManager = new SessionManager(client.id)
    this.triggerMatcher = new TriggerMatcher(client.id)
    this.nodeExecutor = new NodeExecutor(client)
    this.billing = new BillingService(client)
  }

  async processMessage(input: {
    from: string
    contactId: string
    message: any
    type: string
  }): Promise<void> {
    const { from, contactId, message, type } = input

    // ── QUOTA CHECK ──────────────────────────────────────────────
    const allowed = await this.billing.checkQuota()
    if (!allowed) {
      logger.warn({ clientId: this.client.id }, 'Message quota exceeded')
      return
    }

    // ── LOAD SESSION ─────────────────────────────────────────────
    let session = await this.sessionManager.get(from)

    // ── EXTRACT PAYLOAD ──────────────────────────────────────────
    const textBody    = message.text?.body?.toLowerCase()?.trim() ?? ''
    const buttonReply = message.interactive?.button_reply
    const listReply   = message.interactive?.list_reply
    const nfmReply    = message.interactive?.nfm_reply     // Meta Flow reply
    const mediaId     = message.image?.id ?? message.video?.id ?? message.document?.id

    // ── CASE 1: ACTIVE SESSION — WAITING FOR INPUT ───────────────
    if (session?.status === 'waiting_input') {
      await this.continueSession(session, {
        text: textBody, buttonReply, listReply, nfmReply
      })
      return
    }

    // ── CASE 2: BUTTON/LIST CLICK ON EXISTING SESSION ────────────
    if ((buttonReply || listReply) && session) {
      const replyId = buttonReply?.id ?? listReply?.id
      await this.handleInteractiveReply(session, replyId, buttonReply?.title ?? listReply?.title)
      return
    }

    // ── CASE 3: META FLOW REPLY ───────────────────────────────────
    if (nfmReply) {
      await this.handleFlowReply(session, nfmReply)
      return
    }

    // ── CASE 4: TRIGGER MATCHING ─────────────────────────────────
    const flow = await this.loadActiveFlow()
    if (!flow) return

    const matchedNode = await this.triggerMatcher.match(flow, textBody)
    if (!matchedNode) {
      // Fallback node or no match
      const fallback = flow.nodes.find((n: FlowNode) => n.type === 'fallback')
      if (fallback) {
        await this.startFlow(flow, fallback, from, contactId)
      }
      return
    }

    await this.startFlow(flow, matchedNode, from, contactId)
  }

  // ── START A FLOW FROM A TRIGGER NODE ──────────────────────────
  private async startFlow(
    flow: FlowData,
    startNode: FlowNode,
    phone: string,
    contactId: string
  ): Promise<void> {
    const session = await this.sessionManager.create({
      phone,
      contactId,
      flowId: flow.id,
      currentNodeId: startNode.id,
      state: {},
    })

    await this.executeNode(flow, startNode, session)
  }

  // ── EXECUTE A SINGLE NODE ─────────────────────────────────────
  async executeNode(
    flow: FlowData,
    node: FlowNode,
    session: Session
  ): Promise<void> {
    logger.info({
      clientId: this.client.id, sessionId: session.id,
      nodeId: node.id, nodeType: node.type
    }, 'Executing node')

    // Update session current position
    await this.sessionManager.update(session.id, {
      currentNodeId: node.id,
      status: 'active',
    })

    // Execute node-type-specific logic
    const result = await this.nodeExecutor.execute(node, session, flow)

    await this.billing.incrementUsage()

    // ── HANDLE NEXT ──────────────────────────────────────────────
    if (result.action === 'next' && result.nextNodeId) {
      const nextNode = flow.nodes.find((n: FlowNode) => n.id === result.nextNodeId)
      if (nextNode) {
        // Delay node: enqueue delayed job instead of immediate execution
        if (nextNode.type === 'delay') {
          await this.enqueueDelayedNode(flow, nextNode, session, nextNode.data.delayMs)
          return
        }
        await this.executeNode(flow, nextNode, session)
      }
    } else if (result.action === 'wait_input') {
      await this.sessionManager.update(session.id, {
        status: 'waiting_input',
        state: { ...session.state, waitingFor: result.waitingFor },
      })
    } else if (result.action === 'complete') {
      await this.sessionManager.update(session.id, { status: 'completed' })
    } else if (result.action === 'branch') {
      // Condition node returned a branch
      const nextNode = flow.nodes.find((n: FlowNode) => n.id === result.nextNodeId)
      if (nextNode) await this.executeNode(flow, nextNode, session)
    }
  }

  // ── CONTINUE AFTER USER INPUT ─────────────────────────────────
  private async continueSession(
    session: Session,
    input: { text?: string; buttonReply?: any; listReply?: any; nfmReply?: any }
  ): Promise<void> {
    const flow = await this.loadFlowById(session.flowId)
    if (!flow) return

    const currentNode = flow.nodes.find((n: FlowNode) => n.id === session.currentNodeId)
    if (!currentNode) return

    // Store input in session state
    const inputKey = session.state.waitingFor ?? 'last_input'
    const inputValue = input.text ?? input.buttonReply?.title ?? input.listReply?.title ?? ''
    await this.sessionManager.update(session.id, {
      status: 'active',
      state: { ...session.state, [inputKey]: inputValue, waitingFor: undefined },
    })

    // Find next node after input-capture node
    const nextNodeId = currentNode.data?.nextNodeId
    if (nextNodeId) {
      const nextNode = flow.nodes.find((n: FlowNode) => n.id === nextNodeId)
      if (nextNode) await this.executeNode(flow, nextNode, session)
    }
  }

  // ── HANDLE BUTTON / LIST REPLY ────────────────────────────────
  private async handleInteractiveReply(
    session: Session,
    replyId: string,
    replyTitle: string
  ): Promise<void> {
    const flow = await this.loadFlowById(session.flowId)
    if (!flow) return

    // Find the button in any node (search all nodes for this button id)
    let nextNodeId: string | undefined
    for (const node of flow.nodes) {
      const btn = node.buttons?.find((b: any) => b.id === replyId)
      if (btn) {
        nextNodeId = btn.nextNodeId
        break
      }
    }

    if (!nextNodeId) return

    const nextNode = flow.nodes.find((n: FlowNode) => n.id === nextNodeId)
    if (nextNode) {
      await this.sessionManager.update(session.id, {
        state: { ...session.state, last_button: replyId, last_button_text: replyTitle }
      })
      await this.executeNode(flow, nextNode, session)
    }
  }

  private async handleFlowReply(session: Session | null, nfmReply: any): Promise<void> {
    // Parse Meta Flow response_json and store in session state
    try {
      const responseData = JSON.parse(nfmReply.response_json ?? '{}')
      if (session) {
        await this.sessionManager.update(session.id, {
          state: { ...session.state, form_data: responseData }
        })
        const flow = await this.loadFlowById(session.flowId)
        if (flow) {
          const currentNode = flow.nodes.find((n: FlowNode) => n.id === session.currentNodeId)
          const nextNodeId  = currentNode?.data?.nextNodeId
          const nextNode    = flow.nodes.find((n: FlowNode) => n.id === nextNodeId)
          if (nextNode) await this.executeNode(flow, nextNode, session)
        }
      }
    } catch (err) {
      logger.error({ err }, 'Failed to parse nfm_reply')
    }
  }

  private async loadActiveFlow(): Promise<FlowData | null> {
    const cacheKey = `flow:active:${this.client.id}`
    const cached = await redis.get(cacheKey)
    if (cached) return JSON.parse(cached)

    const res = await db.query(
      `SELECT id, data FROM flows WHERE client_id = $1 AND is_active = TRUE 
       ORDER BY updated_at DESC LIMIT 1`,
      [this.client.id]
    )
    if (!res.rows[0]) return null

    const flow = { id: res.rows[0].id, ...res.rows[0].data }
    await redis.setex(cacheKey, 60, JSON.stringify(flow)) // 60s cache
    return flow
  }

  private async loadFlowById(flowId: string): Promise<FlowData | null> {
    const cacheKey = `flow:${flowId}`
    const cached = await redis.get(cacheKey)
    if (cached) return JSON.parse(cached)

    const res = await db.query(`SELECT id, data FROM flows WHERE id = $1`, [flowId])
    if (!res.rows[0]) return null

    const flow = { id: res.rows[0].id, ...res.rows[0].data }
    await redis.setex(cacheKey, 300, JSON.stringify(flow))
    return flow
  }

  private async enqueueDelayedNode(
    flow: FlowData, node: FlowNode, session: Session, delayMs: number
  ): Promise<void> {
    const { delayQueue } = await import('../../config/bullmq')
    await delayQueue.add('resume-after-delay', {
      flowId: flow.id, nodeId: node.id,
      sessionId: session.id, clientId: this.client.id
    }, { delay: delayMs, attempts: 3, backoff: { type: 'exponential', delay: 1000 } })
  }
}