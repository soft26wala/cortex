"use client"
import { useCallback, useState } from "react"
import { ChatMessage, Flow, FlowButton, FlowNode } from "@/types/flow"

const uid = (): string => crypto.randomUUID()

export interface UseChatPreviewReturn {
  messages: ChatMessage[]
  sendMessage: (text: string) => void
  clickButton: (btn: FlowButton) => void
  reset: () => void
}

/**
 * Finds a root node whose triggers include the given text (case-insensitive).
 */
function findNodeByTrigger(
  nodes: FlowNode[],
  text: string
): FlowNode | undefined {
  const normalized = text.trim().toLowerCase()
  return nodes.find((n) =>
    n.triggers.some((t) => t.toLowerCase() === normalized)
  )
}

/**
 * Converts a node's blocks into a flat ordered list of ChatMessages (bot side).
 * - heading / paragraph → text bubble
 * - image               → image bubble
 * Buttons are appended last as a single "buttons" bubble.
 */
function nodeToMessages(node: FlowNode): ChatMessage[] {
  const out: ChatMessage[] = []

  // Merge consecutive text blocks into a single bubble for readability
  let accText = ""

  const flushText = () => {
    if (accText.trim()) {
      out.push({
        id: uid(),
        role: "bot",
        type: "text",
        text: accText.trim(),
      })
      accText = ""
    }
  }

  for (const block of node.blocks) {
    if (block.type === "heading") {
      flushText()
      out.push({
        id: uid(),
        role: "bot",
        type: "text",
        text: `*${block.text}*`, // bold marker for renderer
      })
    } else if (block.type === "paragraph") {
      accText += (accText ? "\n" : "") + block.text
    } else if (block.type === "image") {
      flushText()
      if (block.preview || block.url) {
        out.push({
          id: uid(),
          role: "bot",
          type: "image",
          imageUrl: block.preview ?? block.url,
        })
      }
    }
    // "input" blocks are builder-only — not rendered in chat preview
  }

  flushText()

  if (node.buttons.length > 0) {
    out.push({
      id: uid(),
      role: "bot",
      type: "buttons",
      buttons: node.buttons,
    })
  }

  return out
}

export function useChatPreview(flow: Flow): UseChatPreviewReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const appendMessages = useCallback((msgs: ChatMessage[]) => {
    setMessages((prev) => [...prev, ...msgs])
  }, [])

  /**
   * Called when the user types a message in the chat input.
   * 1. Adds user bubble
   * 2. Looks up a node whose trigger matches the text
   * 3. Appends bot reply
   */
  const sendMessage = useCallback(
    (text: string) => {
      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        type: "text",
        text,
      }

      const node = findNodeByTrigger(flow.nodes, text)

      if (!node) {
        appendMessages([
          userMsg,
          {
            id: uid(),
            role: "bot",
            type: "text",
            text: "Sorry, I didn't understand that. Try a keyword like: " +
              flow.nodes
                .flatMap((n) => n.triggers)
                .slice(0, 5)
                .join(", ") || "...",
          },
        ])
        return
      }

      appendMessages([userMsg, ...nodeToMessages(node)])
    },
    [flow.nodes, appendMessages]
  )

  /**
   * Called when the user taps a button in the chat.
   * 1. Adds user bubble (button label as text)
   * 2. If action === "link" → opens URL
   * 3. If action === "flow" → appends next node reply
   */
  const clickButton = useCallback(
    (btn: FlowButton) => {
      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        type: "text",
        text: btn.text,
      }

      if (btn.action === "link") {
        if (btn.url) window.open(btn.url, "_blank", "noopener,noreferrer")
        appendMessages([userMsg])
        return
      }

      if (btn.action === "flow" && btn.nextNodeId) {
        const nextNode = flow.nodes.find((n) => n.id === btn.nextNodeId)
        if (!nextNode) {
          appendMessages([
            userMsg,
            {
              id: uid(),
              role: "bot",
              type: "text",
              text: "This path has no reply yet. Add content to the linked node.",
            },
          ])
          return
        }
        appendMessages([userMsg, ...nodeToMessages(nextNode)])
      }
    },
    [flow.nodes, appendMessages]
  )

  const reset = useCallback(() => {
    setMessages([])
  }, [])

  return { messages, sendMessage, clickButton, reset }
}