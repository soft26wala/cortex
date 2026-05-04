"use client"
import { useCallback, useState } from "react"
import {
  Block,
  BlockType,
  ButtonAction,
  Flow,
  FlowButton,
  FlowNode,
} from "@/types/flow"

// ── Helpers ───────────────────────────────────────────────────────────────────
const uid = (): string => crypto.randomUUID()

/** Factory — produces a typed blank block with correct shape per type */
const createBlock = (type: BlockType): Block => {
  switch (type) {
    case "heading":
      return { id: uid(), type: "heading", text: "" }
    case "paragraph":
      return { id: uid(), type: "paragraph", text: "" }
    case "image":
      return { id: uid(), type: "image", url: "", preview: "" }
    case "input":
      return { id: uid(), type: "input", label: "", placeholder: "" }
  }
}

// ── Public interface ──────────────────────────────────────────────────────────
export interface UseFlowReturn {
  flow: Flow

  // flow-level
  setFlowName: (name: string) => void
  loadFlow: (flow: Flow) => void

  // nodes
  addTriggerNode: (trigger: string) => FlowNode
  deleteNode: (nodeId: string) => void
  reorderNodes: (fromIndex: number, toIndex: number) => void

  // buttons
  addButton: (
    nodeId: string,
    text: string,
    action: ButtonAction,
    url?: string
  ) => void
  updateButton: (
    nodeId: string,
    btnId: string,
    data: Partial<Omit<FlowButton, "id">>
  ) => void
  deleteButton: (nodeId: string, btnId: string) => void

  // blocks
  addBlock: (nodeId: string, type: BlockType) => void
  updateBlock: (nodeId: string, blockId: string, data: Partial<Block>) => void
  deleteBlock: (nodeId: string, blockId: string) => void
  reorderBlocks: (nodeId: string, fromIndex: number, toIndex: number) => void
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useFlow(): UseFlowReturn {
  const [flow, setFlow] = useState<Flow>({
    name: "Untitled Flow",
    nodes: [],
  })

  // ── Flow-level ──────────────────────────────────────────────────────────────
  const setFlowName = useCallback((name: string) => {
    setFlow((prev) => ({ ...prev, name }))
  }, [])

  const loadFlow = useCallback((loaded: Flow) => {
    setFlow(loaded)
  }, [])

  // ── Nodes ───────────────────────────────────────────────────────────────────
  const addTriggerNode = useCallback((trigger: string): FlowNode => {
    const node: FlowNode = {
      id: uid(),
      parentButtonId: null,
      parentButtonName: null,
      triggers: [trigger.trim().toLowerCase()],
      blocks: [],
      buttons: [],
    }
    setFlow((prev) => ({ ...prev, nodes: [...prev.nodes, node] }))
    return node
  }, [])

  /**
   * Deletes a node AND removes any buttons across all nodes that point to it,
   * preventing dangling references.
   */
  const deleteNode = useCallback((nodeId: string) => {
    setFlow((prev) => ({
      ...prev,
      nodes: prev.nodes
        .filter((n) => n.id !== nodeId)
        .map((n) => ({
          ...n,
          buttons: n.buttons.filter((b) => b.nextNodeId !== nodeId),
        })),
    }))
  }, [])

  const reorderNodes = useCallback((fromIndex: number, toIndex: number) => {
    setFlow((prev) => {
      const nodes = [...prev.nodes]
      const [moved] = nodes.splice(fromIndex, 1)
      nodes.splice(toIndex, 0, moved)
      return { ...prev, nodes }
    })
  }, [])

  // ── Buttons ─────────────────────────────────────────────────────────────────
  const addButton = useCallback(
    (nodeId: string, text: string, action: ButtonAction, url?: string) => {
      const btnId = uid()
      const nextId = uid()

      const newButton: FlowButton = {
        id: btnId,
        text: text.trim(),
        action,
        ...(action === "flow" ? { nextNodeId: nextId } : { url: url ?? "" }),
      }

      setFlow((prev) => {
        // Add button to the parent node
        const updatedNodes = prev.nodes.map((n) =>
          n.id === nodeId
            ? { ...n, buttons: [...n.buttons, newButton] }
            : n
        )

        // For "flow" action: auto-create an empty linked child node
        if (action === "flow") {
          const childNode: FlowNode = {
            id: nextId,
            parentButtonId: btnId,
            parentButtonName: text.trim(),
            triggers: [],
            blocks: [],
            buttons: [],
          }
          return { ...prev, nodes: [...updatedNodes, childNode] }
        }

        return { ...prev, nodes: updatedNodes }
      })
    },
    []
  )

  const updateButton = useCallback(
    (
      nodeId: string,
      btnId: string,
      data: Partial<Omit<FlowButton, "id">>
    ) => {
      setFlow((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) =>
          n.id !== nodeId
            ? n
            : {
                ...n,
                buttons: n.buttons.map((b) =>
                  b.id === btnId ? { ...b, ...data } : b
                ),
              }
        ),
      }))
    },
    []
  )

  /**
   * Deletes a button AND cascades: removes the linked child node (if any)
   * along with any further descendants via a recursive collect.
   */
  const deleteButton = useCallback((nodeId: string, btnId: string) => {
    setFlow((prev) => {
      // Find the linked node id, if any
      const parentNode = prev.nodes.find((n) => n.id === nodeId)
      const btn = parentNode?.buttons.find((b) => b.id === btnId)
      const linkedNodeId = btn?.action === "flow" ? (btn.nextNodeId ?? null) : null

      /** Collect all descendant node ids recursively */
      const collectDescendants = (rootId: string): Set<string> => {
        const toDelete = new Set<string>([rootId])
        const queue = [rootId]
        while (queue.length) {
          const currentId = queue.shift()!
          const node = prev.nodes.find((n) => n.id === currentId)
          node?.buttons.forEach((b) => {
            if (b.action === "flow" && b.nextNodeId && !toDelete.has(b.nextNodeId)) {
              toDelete.add(b.nextNodeId)
              queue.push(b.nextNodeId)
            }
          })
        }
        return toDelete
      }

      const toDelete: Set<string> = linkedNodeId
        ? collectDescendants(linkedNodeId)
        : new Set()

      const updatedNodes = prev.nodes
        .filter((n) => !toDelete.has(n.id))
        .map((n) =>
          n.id === nodeId
            ? { ...n, buttons: n.buttons.filter((b) => b.id !== btnId) }
            : n
        )

      return { ...prev, nodes: updatedNodes }
    })
  }, [])

  // ── Blocks ──────────────────────────────────────────────────────────────────
  const addBlock = useCallback((nodeId: string, type: BlockType) => {
    const block = createBlock(type)
    setFlow((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) =>
        n.id === nodeId ? { ...n, blocks: [...n.blocks, block] } : n
      ),
    }))
  }, [])

  const updateBlock = useCallback(
    (nodeId: string, blockId: string, data: Partial<Block>) => {
      setFlow((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) =>
          n.id !== nodeId
            ? n
            : {
                ...n,
                blocks: n.blocks.map((b) =>
                  b.id === blockId ? ({ ...b, ...data } as Block) : b
                ),
              }
        ),
      }))
    },
    []
  )

  const deleteBlock = useCallback((nodeId: string, blockId: string) => {
    setFlow((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) =>
        n.id !== nodeId
          ? n
          : { ...n, blocks: n.blocks.filter((b) => b.id !== blockId) }
      ),
    }))
  }, [])

  const reorderBlocks = useCallback(
    (nodeId: string, fromIndex: number, toIndex: number) => {
      setFlow((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) => {
          if (n.id !== nodeId) return n
          const blocks = [...n.blocks]
          const [moved] = blocks.splice(fromIndex, 1)
          blocks.splice(toIndex, 0, moved)
          return { ...n, blocks }
        }),
      }))
    },
    []
  )

  return {
    flow,
    setFlowName,
    loadFlow,
    addTriggerNode,
    deleteNode,
    reorderNodes,
    addButton,
    updateButton,
    deleteButton,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
  }
}