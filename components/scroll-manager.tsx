"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface ScrollManagerProps {
  children: React.ReactNode
  className?: string
  onScroll?: (event: Event) => void
  enableVirtualScrolling?: boolean
}

export function ScrollManager({
  children,
  className = "",
  onScroll,
  enableVirtualScrolling = false,
}: ScrollManagerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = (event: Event) => {
      event.stopPropagation()
      isScrollingRef.current = true

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 150)

      if (onScroll) {
        onScroll(event)
      }
    }

    const handleWheel = (event: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isAtTop = scrollTop === 0
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1

      if ((event.deltaY < 0 && !isAtTop) || (event.deltaY > 0 && !isAtBottom)) {
        event.stopPropagation()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch && container.dataset) {
        container.dataset.touchStartY = touch.clientY.toString()
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch || !container.dataset) return

      const startY = Number.parseFloat(container.dataset.touchStartY || "0")
      const deltaY = touch.clientY - startY

      const { scrollTop, scrollHeight, clientHeight } = container
      const isAtTop = scrollTop === 0
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1

      if ((deltaY > 0 && !isAtTop) || (deltaY < 0 && !isAtBottom)) {
        event.stopPropagation()
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener("scroll", handleScroll)
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [onScroll])

  return (
    <div
      ref={containerRef}
      className={`config-panel-scroll ${className}`}
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
      }}
    >
      <div className="scroll-indicator"></div>
      {children}
    </div>
  )
}
