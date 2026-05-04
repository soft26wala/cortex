"use client"
import { useState } from "react"
import {
  Type,
  AlignLeft,
  ImageIcon,
  FormInput,
  Plus,
  Link,
  ArrowRight,
  MousePointerClick,
} from "lucide-react"
import { BlockType, ButtonAction, FlowButton, FlowNode } from "@/types/flow"

interface EditPanelProps {
  node: FlowNode | null
  onAddBlock: (type: BlockType) => void
  onAddButton: (text: string, action: ButtonAction, url?: string) => void
}

const MAX_BUTTONS = 10

const BLOCK_DEFS: {
  type: BlockType
  label: string
  icon: React.ReactNode
  className: string
}[] = [
  {
    type: "heading",
    label: "Heading",
    icon: <Type size={13} />,
    className:
      "bg-violet-500 hover:bg-violet-600 text-white",
  },
  {
    type: "paragraph",
    label: "Paragraph",
    icon: <AlignLeft size={13} />,
    className:
      "bg-zinc-500 hover:bg-zinc-600 text-white",
  },
  {
    type: "image",
    label: "Image",
    icon: <ImageIcon size={13} />,
    className:
      "bg-amber-500 hover:bg-amber-600 text-white",
  },
  {
    type: "input",
    label: "Input Field",
    icon: <FormInput size={13} />,
    className:
      "bg-pink-500 hover:bg-pink-600 text-white",
  },
]

export default function EditPanel({
  node,
  onAddBlock,
  onAddButton,
}: EditPanelProps) {
  const [btnText, setBtnText] = useState("")
  const [btnAction, setBtnAction] = useState<ButtonAction>("flow")
  const [btnUrl, setBtnUrl] = useState("")
  const [urlError, setUrlError] = useState("")

  const canAddButton = node ? node.buttons.length < MAX_BUTTONS : false

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleAddButton = () => {
    if (!btnText.trim() || !node) return

    if (btnAction === "link") {
      if (!validateUrl(btnUrl.trim())) {
        setUrlError("Please enter a valid URL (e.g. https://example.com)")
        return
      }
      setUrlError("")
    }

    onAddButton(btnText.trim(), btnAction, btnUrl.trim() || undefined)
    setBtnText("")
    setBtnUrl("")
    setUrlError("")
  }

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (!node) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 gap-3">
        <MousePointerClick
          size={32}
          className="text-zinc-300 dark:text-zinc-700"
        />
        <p className="text-sm text-zinc-400 dark:text-zinc-500 text-center leading-relaxed">
          Click a node in the canvas to start editing its content
        </p>
      </div>
    )
  }

  return (
    <div className="p-5 space-y-7 overflow-y-auto h-full">
      {/* ── Node info ─────────────────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
          Selected Node
        </p>
        <p className="text-sm text-zinc-700 dark:text-zinc-200 font-medium truncate">
          {node.triggers.length > 0
            ? `Trigger: "${node.triggers.join(", ")}"`
            : node.parentButtonName
            ? `Reply to: "${node.parentButtonName}"`
            : "Unlinked node"}
        </p>
        <p className="text-xs text-zinc-400 mt-0.5">
          {node.blocks.length} block{node.blocks.length !== 1 ? "s" : ""} ·{" "}
          {node.buttons.length} button{node.buttons.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── Add blocks ────────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
          Add Content Block
        </p>
        <div className="grid grid-cols-2 gap-2">
          {BLOCK_DEFS.map(({ type, label, icon, className }) => (
            <button
              key={type}
              onClick={() => onAddBlock(type)}
              className={`${className} text-xs py-2.5 px-3 rounded-xl flex items-center gap-2 font-medium transition-colors`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Add button ────────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
          Add Button ({node.buttons.length}/{MAX_BUTTONS})
        </p>

        <input
          value={btnText}
          onChange={(e) => setBtnText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddButton()}
          placeholder="Button label..."
          maxLength={60}
          className="w-full text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors placeholder:text-zinc-400 mb-2.5"
        />

        {/* Action toggle */}
        <div className="flex gap-2 mb-2.5">
          <ActionToggle
            active={btnAction === "flow"}
            onClick={() => setBtnAction("flow")}
            icon={<ArrowRight size={12} />}
            label="Next Node"
            activeClass="bg-emerald-500 text-white border-emerald-500"
          />
          <ActionToggle
            active={btnAction === "link"}
            onClick={() => setBtnAction("link")}
            icon={<Link size={12} />}
            label="External Link"
            activeClass="bg-sky-500 text-white border-sky-500"
          />
        </div>

        {btnAction === "link" && (
          <div className="mb-2.5">
            <input
              value={btnUrl}
              onChange={(e) => {
                setBtnUrl(e.target.value)
                if (urlError) setUrlError("")
              }}
              placeholder="https://example.com"
              className={`w-full text-sm px-3 py-2 rounded-xl border transition-colors outline-none placeholder:text-zinc-400 bg-transparent ${
                urlError
                  ? "border-red-400 focus:border-red-500"
                  : "border-zinc-200 dark:border-zinc-700 focus:border-blue-400 dark:focus:border-blue-500"
              }`}
            />
            {urlError && (
              <p className="text-xs text-red-500 mt-1">{urlError}</p>
            )}
          </div>
        )}

        <button
          onClick={handleAddButton}
          disabled={!canAddButton || !btnText.trim()}
          className="w-full flex items-center justify-center gap-1.5 text-sm py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus size={14} />
          Add Button
        </button>

        {!canAddButton && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center mt-1.5">
            Maximum {MAX_BUTTONS} buttons per node
          </p>
        )}
      </section>

      {/* ── Existing buttons summary ──────────────────────────────────────── */}
      {node.buttons.length > 0 && (
        <section>
          <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
            Current Buttons
          </p>
          <div className="space-y-2">
            {node.buttons.map((btn) => (
              <ButtonSummary key={btn.id} btn={btn} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function ActionToggle({
  active,
  onClick,
  icon,
  label,
  activeClass,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  activeClass: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-xl border transition-all font-medium ${
        active
          ? activeClass
          : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function ButtonSummary({ btn }: { btn: FlowButton }) {
  return (
    <div className="text-xs bg-zinc-50 dark:bg-zinc-800 rounded-xl p-2.5">
      <div className="font-medium text-zinc-700 dark:text-zinc-200 truncate">
        {btn.text}
      </div>
      <div className="text-zinc-400 mt-0.5 flex items-center gap-1">
        {btn.action === "flow" ? (
          <>
            <ArrowRight size={9} />
            <span>Goes to next node</span>
          </>
        ) : (
          <>
            <Link size={9} />
            <span className="truncate">{btn.url}</span>
          </>
        )}
      </div>
    </div>
  )
}