// app/error.tsx - Global error boundary
'use client'
import { useEffect } from 'react'
import { AlertTriangle, RotateCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-4">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto">
          <AlertTriangle className="text-red-600 dark:text-red-400" size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Something went wrong</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">We encountered an unexpected error</p>
        </div>
        <p className="text-xs text-zinc-500 font-mono bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg max-w-md overflow-auto">
          {error.message || 'Unknown error'}
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors mx-auto"
        >
          <RotateCw size={14} /> Try again
        </button>
      </div>
    </div>
  )
}