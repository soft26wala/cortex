// ─────────────────────────────────────────────
// BLOCK TYPES
// ─────────────────────────────────────────────

export type BlockType = "heading" | "paragraph" | "image" | "input"
export type ButtonAction = "flow" | "link"

export interface HeadingBlock {
  id: string
  type: "heading"
  text: string
}

export interface ParagraphBlock {
  id: string
  type: "paragraph"
  text: string
}

export interface ImageBlock {
  id: string
  type: "image"
  url: string
  preview?: string
}

export interface InputBlock {
  id: string
  type: "input"
  label: string
  placeholder: string
}

export type Block = HeadingBlock | ParagraphBlock | ImageBlock | InputBlock

// ─────────────────────────────────────────────
// BUTTON
// ─────────────────────────────────────────────

export interface FlowButton {
  id: string
  text: string
  action: ButtonAction
  nextNodeId?: string   // used when action === "flow"
  url?: string          // used when action === "link"
}

// ─────────────────────────────────────────────
// NODE
// ─────────────────────────────────────────────

export interface FlowNode {
  id: string
  parentButtonId: string | null   // button that spawned this node
  parentButtonName: string | null // display label
  triggers: string[]              // root-level keyword triggers (e.g. ["hi","hello"])
  blocks: Block[]
  buttons: FlowButton[]
}

// ─────────────────────────────────────────────
// FLOW (persisted entity)
// ─────────────────────────────────────────────

export interface Flow {
  id?: string
  name: string
  nodes: FlowNode[]
}

// ─────────────────────────────────────────────
// CHAT PREVIEW
// ─────────────────────────────────────────────

export type ChatMessageType = "text" | "image" | "buttons"

export interface ChatMessage {
  id: string
  role: "user" | "bot"
  type: ChatMessageType
  text?: string
  imageUrl?: string
  buttons?: FlowButton[]
}

// ─────────────────────────────────────────────
// API RESPONSE SHAPES
// ─────────────────────────────────────────────

export interface FlowRecord {
  id: string
  name: string
  data: Flow
  created_at: string
  updated_at: string
}