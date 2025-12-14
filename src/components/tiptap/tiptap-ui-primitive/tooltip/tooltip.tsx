"use client"

import * as React from "react"
import { cn } from "../../../../lib/tiptap-utils"

interface TooltipContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TooltipContext = React.createContext<TooltipContextType | null>(null)

/* ---------------- Tooltip Root ---------------- */
export function Tooltip({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const [open, setOpen] = React.useState(false)
  const timeoutRef = React.useRef<number | null>(null)

  const openWithDelay = () => {
    if (delay) {
      timeoutRef.current = window.setTimeout(() => setOpen(true), delay)
    } else {
      setOpen(true)
    }
  }

  const close = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setOpen(false)
  }

  return (
    <TooltipContext.Provider
      value={{ open, setOpen }}
    >
      <span
        className="relative inline-flex"
        onMouseEnter={openWithDelay}
        onMouseLeave={close}
        onFocus={openWithDelay}
        onBlur={close}
      >
        {children}
      </span>
    </TooltipContext.Provider>
  )
}

/* ---------------- Trigger ---------------- */
export function TooltipTrigger({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={className}
      {...props}
      style={{ display: "inline-flex" }}
    >
      {children}
    </span>
  )
}


/* ---------------- Content ---------------- */
export const TooltipContent = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ctx = React.useContext(TooltipContext)
  if (!ctx || !ctx.open) return null

  return (
    <div
      className={cn(
        "absolute z-50 -top-2 left-1/2 -translate-x-1/2 -translate-y-full",
        "rounded bg-black px-2 py-1 text-xs text-white whitespace-nowrap",
        className
      )}
    >
      {children}
    </div>
  )
}

Tooltip.displayName = "Tooltip"
TooltipTrigger.displayName = "TooltipTrigger"
TooltipContent.displayName = "TooltipContent"
