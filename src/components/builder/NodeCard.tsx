"use client"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { GripVertical, Trash2, Link, ArrowRight, Hash } from "lucide-react"
import { Block, FlowButton, FlowNode } from "@/types/flow"
import BlockRenderer from "./BlockRenderer"

interface NodeCardProps {
  node: FlowNode
  isSelected: boolean
  onSelect: () => void
  onDeleteNode: () => void
  onUpdateBlock: (blockId: string, data: Partial<Block>) => void
  onDeleteBlock: (blockId: string) => void
  onDeleteButton: (btnId: string) => void
  onReorderBlocks: (fromIndex: number, toIndex: number) => void
}

export default function NodeCard({
  node,
  isSelected,
  onSelect,
  onDeleteNode,
  onUpdateBlock,
  onDeleteBlock,
  onDeleteButton,
  onReorderBlocks,
}: NodeCardProps) {
  // ── Outer sortable (node in flow) ─────────────────────────────────────────
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: node.id })

  const nodeStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // ── Inner DnD (blocks within this node) ───────────────────────────────────
  const blockSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  )

  const handleBlockDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const fromIdx = node.blocks.findIndex((b) => b.id === active.id)
    const toIdx = node.blocks.findIndex((b) => b.id === over.id)
    if (fromIdx !== -1 && toIdx !== -1) onReorderBlocks(fromIdx, toIdx)
  }

  // ── Label logic ────────────────────────────────────────────────────────────
  const isTrigger = node.triggers.length > 0
  const label = isTrigger
    ? `Trigger: "${node.triggers.join(", ")}"`
    : node.parentButtonName
    ? `Reply to: "${node.parentButtonName}"`
    : "Orphan node"

  const labelColor = isTrigger
    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
    : "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"

  return (
    <div
      ref={setNodeRef}
      style={nodeStyle}
      className={[
        "relative group/node rounded-2xl border transition-all select-none",
        "bg-white dark:bg-zinc-900",
        isSelected
          ? "border-blue-400 dark:border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/30 ring-1 ring-blue-400 dark:ring-blue-500"
          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700",
        isDragging ? "opacity-50 shadow-2xl z-50" : "",
      ].join(" ")}
      onClick={onSelect}
    >
      {/* ── Node drag handle ─────────────────────────────────────────────── */}
      <button
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        className="absolute left-3 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors z-10"
        aria-label="Drag node"
      >
        <GripVertical size={15} />
      </button>

      {/* ── Delete node ──────────────────────────────────────────────────── */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDeleteNode()
        }}
        tabIndex={-1}
        className="absolute top-3 right-3 text-zinc-300 dark:text-zinc-700 hover:text-red-500 opacity-0 group-hover/node:opacity-100 transition-all z-10"
        aria-label="Delete node"
      >
        <Trash2 size={14} />
      </button>

      <div className="pl-9 pr-8 py-4">
        {/* ── Label chip ─────────────────────────────────────────────────── */}
        <div
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full mb-3 ${labelColor}`}
        >
          {isTrigger ? <Hash size={10} /> : <ArrowRight size={10} />}
          {label}
        </div>

        {/* ── Blocks ─────────────────────────────────────────────────────── */}
        <DndContext
          sensors={blockSensors}
          collisionDetection={closestCenter}
          onDragEnd={handleBlockDragEnd}
        >
          <SortableContext
            items={node.blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-1 min-h-[4px]">
              {node.blocks.map((block) => (
                <BlockRenderer
                  key={block.id}
                  block={block}
                  onUpdate={(data) => onUpdateBlock(block.id, data)}
                  onDelete={() => onDeleteBlock(block.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {node.blocks.length === 0 && (
          <div className="text-xs text-zinc-400 dark:text-zinc-600 py-3 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl italic">
            No content blocks — select node and add from the right panel →
          </div>
        )}

        {/* ── Buttons row ────────────────────────────────────────────────── */}
        {node.buttons.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            {node.buttons.map((btn) => (
              <ButtonChip
                key={btn.id}
                btn={btn}
                onDelete={() => {
                  onDeleteButton(btn.id)
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Sub-component ─────────────────────────────────────────────────────────────
function ButtonChip({
  btn,
  onDelete,
}: {
  btn: FlowButton
  onDelete: () => void
}) {
  return (
    <div className="relative group/btn">
      <span
        className={[
          "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full select-none",
          btn.action === "flow"
            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
            : "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800",
        ].join(" ")}
      >
        {btn.action === "flow" ? (
          <ArrowRight size={10} />
        ) : (
          <Link size={10} />
        )}
        {btn.text}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity hover:bg-red-600"
        aria-label={`Delete button ${btn.text}`}
      >
        ×
      </button>
    </div>
  )
}