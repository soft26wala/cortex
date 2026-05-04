"use client"
import { useEffect, useRef, useState, KeyboardEvent } from "react"
import { Send, RotateCcw, Bot, User } from "lucide-react"
import { ChatMessage, FlowButton } from "@/types/flow"
import { UseChatPreviewReturn } from "@/hooks/useChatPreview"

export default function ChatPreview({
  messages,
  sendMessage,
  clickButton,
  reset,
}: UseChatPreviewReturn) {
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    sendMessage(text)
    setInput("")
    inputRef.current?.focus()
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex-1 flex justify-center items-start py-6 px-4 bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
      <div className="w-full max-w-sm flex flex-col h-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 bg-emerald-600 dark:bg-emerald-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Flow Preview</p>
              <p className="text-xs text-emerald-200">online</p>
            </div>
          </div>

          <button
            onClick={reset}
            title="Reset conversation"
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <RotateCcw size={15} />
          </button>
        </div>

        {/* ── Message list ────────────────────────────────────────────────── */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-3"
          style={{
            background:
              "repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(0,0,0,0.012) 10px, rgba(0,0,0,0.012) 20px)",
            backgroundColor: "#ece5dd",
          }}
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-2 py-12">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <Bot size={22} className="text-emerald-600" />
              </div>
              <p className="text-sm text-zinc-500 font-medium">
                Bot Preview
              </p>
              <p className="text-xs text-zinc-400 max-w-[180px] leading-relaxed">
                Type a trigger keyword (e.g.{" "}
                <span className="font-mono bg-white/60 px-1 rounded">hi</span>
                ) to start the conversation
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} onButtonClick={clickButton} />
          ))}

          <div ref={bottomRef} />
        </div>

        {/* ── Input bar ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 px-3 py-3 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message..."
            className="flex-1 text-sm px-4 py-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:border-emerald-400 dark:focus:border-emerald-500 transition-colors placeholder:text-zinc-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Send message"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Message bubble ─────────────────────────────────────────────────────────────
function MessageBubble({
  msg,
  onButtonClick,
}: {
  msg: ChatMessage
  onButtonClick: (btn: FlowButton) => void
}) {
  const isUser = msg.role === "user"

  if (msg.type === "text" && msg.text) {
    const isHeading = msg.text.startsWith("*") && msg.text.endsWith("*")
    const displayText = isHeading ? msg.text.slice(1, -1) : msg.text

    return (
      <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
        {!isUser && (
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mb-0.5">
            <Bot size={12} className="text-white" />
          </div>
        )}

        <div
          className={[
            "max-w-[78%] px-4 py-2.5 rounded-2xl text-sm shadow-sm break-words",
            isUser
              ? "bg-emerald-500 text-white rounded-br-md"
              : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-bl-md",
            isHeading ? "font-semibold" : "",
          ].join(" ")}
        >
          {displayText.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < displayText.split("\n").length - 1 && <br />}
            </span>
          ))}
        </div>

        {isUser && (
          <div className="w-6 h-6 rounded-full bg-zinc-400 flex items-center justify-center flex-shrink-0 mb-0.5">
            <User size={12} className="text-white" />
          </div>
        )}
      </div>
    )
  }

  if (msg.type === "image" && msg.imageUrl) {
    return (
      <div className="flex items-end gap-2 justify-start">
        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mb-0.5">
          <Bot size={12} className="text-white" />
        </div>
        <div className="max-w-[78%] rounded-2xl overflow-hidden shadow-sm rounded-bl-md">
          <img
            src={msg.imageUrl}
            alt="Bot image"
            className="w-full h-40 object-cover"
          />
        </div>
      </div>
    )
  }

  if (msg.type === "buttons" && msg.buttons) {
    return (
      <div className="flex flex-col items-start gap-1.5 ml-8">
        {msg.buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => onButtonClick(btn)}
            className="text-sm text-emerald-700 dark:text-emerald-400 bg-white dark:bg-zinc-800 border border-emerald-300 dark:border-emerald-700 rounded-2xl px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors shadow-sm text-left w-auto"
          >
            {btn.text}
            {btn.action === "link" && (
              <span className="ml-1.5 text-xs opacity-60">↗</span>
            )}
          </button>
        ))}
      </div>
    )
  }

  return null
}