'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function FlowDetailPage() {
  const params = useParams()
  const router = useRouter()
  const flowId = params?.id as string

  useEffect(() => {
    if (flowId) {
      router.replace(`/flows/${flowId}/builder`)
    }
  }, [flowId, router])

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-[#050507] bg-slate-50 text-zinc-900 dark:text-white p-6">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Loading Flow Builder #{flowId}…</p>
      </div>
    </div>
  )
}
