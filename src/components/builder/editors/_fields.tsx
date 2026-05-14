// components/builder/editors/_fields.tsx
'use client'
import { cn } from '@/lib/utils'

export function Field({ label, children, hint }: {
  label: string; children: React.ReactNode; hint?: string
}) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
      {hint && <p className="text-[10px] text-zinc-400 mt-1">{hint}</p>}
    </div>
  )
}

export function Input({ value, onChange, placeholder, className }: {
  value?: string; onChange: (v: string) => void;
  placeholder?: string; className?: string
}) {
  return (
    <input
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        'w-full text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700',
        'bg-transparent outline-none focus:border-emerald-400 transition-colors',
        'placeholder:text-zinc-400 dark:placeholder:text-zinc-600',
        className
      )}
    />
  )
}

export function Textarea({ value, onChange, placeholder, rows = 3 }: {
  value?: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number
}) {
  return (
    <textarea
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700
        bg-transparent outline-none focus:border-emerald-400 transition-colors resize-none
        placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
    />
  )
}

export function Select({ value, onChange, options }: {
  value?: string; onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>
}) {
  return (
    <select
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      className="w-full text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700
        bg-white dark:bg-zinc-900 outline-none focus:border-emerald-400 transition-colors"
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

export function EditorSection({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-4 space-y-4">{children}</div>
}