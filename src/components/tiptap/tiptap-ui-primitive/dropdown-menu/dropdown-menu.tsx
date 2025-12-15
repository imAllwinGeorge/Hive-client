"use client"

import * as React from "react"
import { cn } from "../../../../lib/tiptap-utils"

interface DropdownContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownContext = React.createContext<DropdownContextType | null>(null)

/* ---------------- Root ---------------- */
interface DropdownMenuProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function DropdownMenu({
  children,
  open: controlledOpen,
  onOpenChange,
}: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  )
}

/* ---------------- Trigger ---------------- */
function DropdownMenuTrigger({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="relative inline-flex">{children}</div>
}

/* ---------------- Content ---------------- */
const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { sideOffset?: number }
>(({ className, sideOffset = 4, ...props }, ref) => {
  const ctx = React.useContext(DropdownContext)
  const localRef = React.useRef<HTMLDivElement>(null)

  const mergedRef = (node: HTMLDivElement | null) => {
    localRef.current = node
    if (typeof ref === "function") ref(node)
    else if (ref) ref.current = node
  }

  if (!ctx || !ctx.open) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (localRef.current && !localRef.current.contains(e.target as Node)) {
        ctx.setOpen(false)
      }
    }

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.setOpen(false)
    }

    document.addEventListener("mousedown", onClickOutside)
    document.addEventListener("keydown", onEscape)

    return () => {
      document.removeEventListener("mousedown", onClickOutside)
      document.removeEventListener("keydown", onEscape)
    }
  }, [ctx])

  return (
    <div
      ref={mergedRef}
      style={{ marginTop: sideOffset }}
      className={cn(
        "absolute z-50 min-w-40 rounded-md border bg-white shadow-md p-1",
        "tiptap-dropdown-menu",
        className
      )}
      {...props}
    />
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

/* ---------------- Item ---------------- */
const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, onClick, ...props }, ref) => {
  const ctx = React.useContext(DropdownContext)

  return (
    <div
      ref={ref}
      role="menuitem"
      tabIndex={0}
      className={cn(
        "cursor-pointer select-none rounded px-2 py-1 text-sm hover:bg-muted",
        className
      )}
      onClick={(e) => {
        onClick?.(e)
        ctx?.setOpen(false)
      }}
      {...props}
    />
  )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

/* ---------------- Simple stubs ---------------- */
const DropdownMenuGroup = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
)

const DropdownMenuSub = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
)

const DropdownMenuSubTrigger = DropdownMenuItem
const DropdownMenuSubContent = DropdownMenuContent
const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)
const DropdownMenuRadioGroup = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
)

/* ---------------- Exports ---------------- */
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
}
