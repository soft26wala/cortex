"use client"
import { ChangeEvent } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash2 } from "lucide-react"
import { Block } from "@/types/flow"

interface BlockRendererProps {
  block: Block
  onUpdate: (data: Partial<Block>) => void
  onDelete: () => void
}

const inputBase =
  "w-full bg-transparent outline-none resize-none " +
  "border-b border-transparent focus:border-zinc-300 dark:focus:border-zinc-600 " +
  "transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"

export default function BlockRenderer({
  block,
  onUpdate,
  onDelete,
}: BlockRendererProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group/block flex items-start gap-2 py-1 ${isDragging ? "opacity-40 z-50" : ""}`}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        className="mt-1 text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 dark:hover:text-zinc-400 cursor-grab active:cursor-grabbing flex-shrink-0 transition-colors"
        aria-label="Drag block"
      >
        <GripVertical size={14} />
      </button>

      {/* Block content */}
      <div className="flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
        {block.type === "heading" && (
          <input
            value={block.text}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onUpdate({ text: e.target.value } as Partial<Block>)
            }
            placeholder="Heading text..."
            className={`${inputBase} font-semibold text-base text-zinc-800 dark:text-zinc-100`}
          />
        )}

        {block.type === "paragraph" && (
          <textarea
            value={block.text}
            rows={2}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              onUpdate({ text: e.target.value } as Partial<Block>)
            }
            placeholder="Paragraph text..."
            className={`${inputBase} text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed`}
          />
        )}

        {block.type === "image" && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="block text-xs text-zinc-500 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-zinc-100 dark:file:bg-zinc-800 file:text-zinc-600 dark:file:text-zinc-300 hover:file:bg-zinc-200 dark:hover:file:bg-zinc-700 transition"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0]
                if (!file) return
                const preview = URL.createObjectURL(file)
                onUpdate({ preview, url: preview } as Partial<Block>)
              }}
            />
            {block.preview && (
              <img
                src={block.preview}
                alt="Block image preview"
                className="w-full h-28 object-cover rounded-lg border border-zinc-200 dark:border-zinc-700"
              />
            )}
          </div>
        )}

        {block.type === "input" && (
          <div className="space-y-1">
            <input
              value={block.label}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onUpdate({ label: e.target.value } as Partial<Block>)
              }
              placeholder="Field label..."
              className={`${inputBase} text-sm font-medium`}
            />
            <input
              value={block.placeholder}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onUpdate({ placeholder: e.target.value } as Partial<Block>)
              }
              placeholder="Placeholder text..."
              className={`${inputBase} text-xs text-zinc-400`}
            />
          </div>
        )}
      </div>

      {/* Delete block */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        tabIndex={-1}
        className="mt-1 text-zinc-300 dark:text-zinc-700 hover:text-red-500 opacity-0 group-hover/block:opacity-100 transition-all flex-shrink-0"
        aria-label="Delete block"
      >
        <Trash2 size={13} />
      </button>
    </div>
  )
}