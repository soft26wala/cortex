"use client"
import { useCallback, useEffect, useState } from "react"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import {
  Save,
  Eye,
  Wrench,
  Sun,
  Moon,
  Hash,
  CheckCircle2,
  XCircle,
  Loader2,
  MessageSquareText,
} from "lucide-react"
import { useFlow } from "@/hooks/useFlow"
import { useChatPreview } from "@/hooks/useChatPreview"
import NodeCard from "../../components/builder/NodeCard"
import EditPanel from "../../components/builder/EditPanel"
import ChatPreview from "../../components/builder/ChatPreview"
import { Block, BlockType, ButtonAction, FlowButton, FlowNode } from "@/types/flow"

type SaveStatus = "idle" | "saving" | "saved" | "error"

export default function BuilderPage() {
  // ── State ──────────────────────────────────────────────────────────────────
  const {
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
  } = useFlow()

  const chatPreview = useChatPreview(flow)

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [triggerInput, setTriggerInput] = useState("")
  const [view, setView] = useState<"builder" | "preview">("builder")
  const [dark, setDark] = useState(true)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")

  const selectedNode: FlowNode | null =
    flow.nodes.find((n) => n.id === selectedNodeId) ?? null

  // ── Load existing flow on mount ────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/flow")
      .then((r) => (r.ok ? r.json() : null))
      .then((record) => {
        if (record?.data) loadFlow(record.data)
      })
      .catch(() => {
        // No saved flow yet — start fresh
      })
  }, [loadFlow])

  // ── DnD sensors ───────────────────────────────────────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const handleNodeDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return
      const fromIdx = flow.nodes.findIndex((n) => n.id === active.id)
      const toIdx = flow.nodes.findIndex((n) => n.id === over.id)
      if (fromIdx !== -1 && toIdx !== -1) reorderNodes(fromIdx, toIdx)
    },
    [flow.nodes, reorderNodes]
  )

  // ── Save flow ──────────────────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    setSaveStatus("saving")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/flow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: flow.name, data: flow }),
      })
      setSaveStatus(res.ok ? "saved" : "error")
    } catch {
      setSaveStatus("error")
    } finally {
      setTimeout(() => setSaveStatus("idle"), 2500)
    }
  }, [flow])

  // ── Add trigger node ───────────────────────────────────────────────────────
  const handleAddTrigger = useCallback(() => {
    const text = triggerInput.trim()
    if (!text) return
    const node = addTriggerNode(text)
    setTriggerInput("")
    setSelectedNodeId(node.id)
  }, [triggerInput, addTriggerNode])

  // ── Deselect when clicking canvas bg ──────────────────────────────────────
  const handleCanvasClick = useCallback(() => {
    setSelectedNodeId(null)
  }, [])

  const triggerNodes = flow.nodes.filter((n) => n.triggers.length > 0)

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden mt-20">

        {/* ══ TOP BAR ══════════════════════════════════════════════════════ */}
        <header className="flex items-center justify-between px-5 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 z-20 flex-shrink-0">
          {/* Flow name */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
              <MessageSquareText size={14} className="text-white" />
            </div>
            <input
              value={flow.name}
              onChange={(e) => setFlowName(e.target.value)}
              className="text-base font-semibold bg-transparent outline-none hover:underline focus:underline decoration-zinc-300 w-48"
              title="Click to rename flow"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <button
              onClick={() =>
                setView((v) => (v === "builder" ? "preview" : "builder"))
              }
              className={`flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-xl font-medium transition-colors ${
                view === "preview"
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                  : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              {view === "builder" ? (
                <>
                  <Eye size={14} /> Preview
                </>
              ) : (
                <>
                  <Wrench size={14} /> Builder
                </>
              )}
            </button>

            {/* Dark mode */}
            <button
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400"
              title="Toggle dark mode"
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={saveStatus === "saving"}
              className={`flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-xl font-medium transition-colors disabled:opacity-60 ${
                saveStatus === "error"
                  ? "bg-red-500 text-white"
                  : saveStatus === "saved"
                  ? "bg-emerald-500 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {saveStatus === "saving" && (
                <Loader2 size={13} className="animate-spin" />
              )}
              {saveStatus === "saved" && <CheckCircle2 size={13} />}
              {saveStatus === "error" && <XCircle size={13} />}
              {saveStatus === "idle" && <Save size={13} />}
              {saveStatus === "saving"
                ? "Saving…"
                : saveStatus === "saved"
                ? "Saved!"
                : saveStatus === "error"
                ? "Error"
                : "Save Flow"}
            </button>
          </div>
        </header>

        {/* ══ MAIN CONTENT ════════════════════════════════════════════════ */}
        {view === "preview" ? (
          <ChatPreview {...chatPreview} />
        ) : (
          <div className="flex flex-1 overflow-hidden">

            {/* ── LEFT PANEL: Triggers ──────────────────────────────────── */}
            <aside className="w-60 flex-shrink-0 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
                  Triggers
                </p>
                <div className="flex gap-2">
                  <input
                    value={triggerInput}
                    onChange={(e) => setTriggerInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTrigger()}
                    placeholder="e.g. hi, buy, help…"
                    className="flex-1 min-w-0 text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-emerald-400 placeholder:text-zinc-400 transition-colors"
                  />
                  <button
                    onClick={handleAddTrigger}
                    disabled={!triggerInput.trim()}
                    className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-40"
                    title="Add trigger"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-2">
                  Press Enter or click + to add
                </p>
              </div>

              {/* Trigger list */}
              <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                {triggerNodes.length === 0 ? (
                  <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center py-6">
                    No triggers yet
                  </p>
                ) : (
                  triggerNodes.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-xl flex items-center gap-2 transition-colors ${
                        selectedNodeId === node.id
                          ? "bg-emerald-50 dark:bg-emerald-900/25 text-emerald-700 dark:text-emerald-400 font-medium"
                          : "hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      <Hash size={12} className="flex-shrink-0 opacity-60" />
                      <span className="truncate">{node.triggers.join(", ")}</span>
                    </button>
                  ))
                )}
              </nav>

              {/* Node count */}
              <div className="p-3 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs text-zinc-400 dark:text-zinc-600">
                  {flow.nodes.length} node{flow.nodes.length !== 1 ? "s" : ""} in flow
                </p>
              </div>
            </aside>

            {/* ── CENTER: Canvas ────────────────────────────────────────── */}
            <main
              className="flex-1 overflow-y-auto"
              onClick={handleCanvasClick}
            >
              {flow.nodes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-400 dark:text-zinc-600 gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <MessageSquareText size={28} className="opacity-50" />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-medium text-zinc-500 dark:text-zinc-400">
                      No nodes yet
                    </p>
                    <p className="text-sm mt-1 text-zinc-400 dark:text-zinc-600">
                      Add a trigger keyword on the left to get started
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6" onClick={(e) => e.stopPropagation()}>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleNodeDragEnd}
                  >
                    <SortableContext
                      items={flow.nodes.map((n) => n.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="max-w-2xl mx-auto space-y-4">
                        {flow.nodes.map((node) => (
                          <NodeCard
                            key={node.id}
                            node={node}
                            isSelected={selectedNodeId === node.id}
                            onSelect={() => setSelectedNodeId(node.id)}
                            onDeleteNode={() => {
                              deleteNode(node.id)
                              if (selectedNodeId === node.id)
                                setSelectedNodeId(null)
                            }}
                            onUpdateBlock={(blockId: string, data: Partial<Block>) =>
                              updateBlock(node.id, blockId, data)
                            }
                            onDeleteBlock={(blockId: string) =>
                              deleteBlock(node.id, blockId)
                            }
                            onDeleteButton={(btnId: string) =>
                              deleteButton(node.id, btnId)
                            }
                            onReorderBlocks={(from: number, to: number) =>
                              reorderBlocks(node.id, from, to)
                            }
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </main>

            {/* ── RIGHT PANEL: Edit ─────────────────────────────────────── */}
            <aside className="w-72 flex-shrink-0 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex-shrink-0">
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Node Editor
                </p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <EditPanel
                  node={selectedNode}
                  onAddBlock={(type: BlockType) => {
                    if (selectedNodeId) addBlock(selectedNodeId, type)
                  }}
                  onAddButton={(
                    text: string,
                    action: ButtonAction,
                    url?: string
                  ) => {
                    if (selectedNodeId)
                      addButton(selectedNodeId, text, action, url)
                  }}
                />
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}