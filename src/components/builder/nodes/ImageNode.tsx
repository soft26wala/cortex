// components/builder/nodes/ImageNode.tsx
'use client'
import { memo } from 'react'
import { type NodeProps } from 'reactflow'
import { ImageIcon } from 'lucide-react'
import { BaseNode } from './BaseNode'
import type { FlowNodeData } from '@/store/flow.store'

export const ImageNode = memo(({ id, selected, data }: NodeProps<FlowNodeData>) => (
  <BaseNode
    id={id} selected={selected}
    icon={<ImageIcon size={13} />} label="Image"
    color="bg-pink-500" borderColor="border-pink-400"
  >
    {data.imageUrl ? (
      <div className="relative rounded-lg overflow-hidden h-20 bg-zinc-100 dark:bg-zinc-800">
        <img
          src={data.imageUrl}
          alt="preview"
          className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>
    ) : (
      <div className="h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
        <ImageIcon size={20} className="text-zinc-300" />
      </div>
    )}
    {data.caption && (
      <p className="text-[11px] text-zinc-500 mt-1.5 line-clamp-2">{data.caption}</p>
    )}
  </BaseNode>
))
ImageNode.displayName = 'ImageNode'