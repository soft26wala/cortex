"use client"

import React, { useState, useRef } from "react"
import { cn } from "@/lib/utils"

export interface LensProps {
  children: React.ReactNode
  zoomFactor?: number
  lensSize?: number
  isStatic?: boolean
  position?: { x: number; y: number }
  ariaLabel?: string
  className?: string
}

export function Lens({
  children,
  zoomFactor = 2,
  lensSize = 150,
  isStatic = false,
  position = { x: 0, y: 0 },
  ariaLabel = "Zoom Area",
  className = "",
}: LensProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  const currentPosition = isStatic ? position : mousePosition

  return (
    <div
      ref={containerRef}
      aria-label={ariaLabel}
      className={cn("relative overflow-hidden cursor-crosshair rounded-xl", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {isHovered && containerRef.current && (
        <div
          className="pointer-events-none absolute rounded-full border-2 border-white/80 shadow-2xl overflow-hidden z-20"
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            left: `${currentPosition.x - lensSize / 2}px`,
            top: `${currentPosition.y - lensSize / 2}px`,
          }}
        >
          <div
            className="absolute top-0 left-0"
            style={{
              width: containerRef.current.clientWidth,
              height: containerRef.current.clientHeight,
              transform: `scale(${zoomFactor})`,
              transformOrigin: `${currentPosition.x}px ${currentPosition.y}px`,
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
