import * as React from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { cn } from "../../../lib/tiptap-utils"

// --- CORE COMPONENT REPLACEMENT: <Select> (Root, Value, Trigger, Content) ---

// Define props for the combined component.
interface NativeSelectProps
  extends Omit<React.ComponentPropsWithoutRef<"select">, "size"> // <--- FIX IS HERE: Omit the original 'size' prop (which expects a number)
{
  className?: string
  /** Custom size variant for styling purposes. */
  size?: "sm" | "default" // <-- Now we can safely define our custom string-based size
  // Children will be <optgroup> and <option> elements
  children?: React.ReactNode
}

// NOTE: This component replaces Select, SelectValue, SelectTrigger, and SelectContent.
// The custom styling for the trigger/input will only partially work due to native select limitations.
function Select({
  className,
  size = "default",
  children,
  // Omit the children prop as it's passed as content
  ...props
}: NativeSelectProps) {
  // Combine classes for the native <select> element.
  // Many of the Radix-specific classes (like data-size) must be manually applied.
  const selectClasses = cn(
    "border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8", // Added appearance-none and extra padding for custom arrow attempt
    size === "default" ? "h-9" : "h-8",
    className
  )

  return (
    <div className="relative inline-block w-fit">
      {/* The Native HTML Select element */}
      <select
        data-slot="select" // Keeping data-slot for consistency
        data-size={size} // Keeping data-size for CSS targeting
        className={selectClasses}
        {...props}
      >
        {children}
      </select>
      {/* Custom Chevron Down icon to visually replace the native select arrow (requires appearance-none on the select) */}
      <ChevronDownIcon className="size-4 opacity-50 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  )
}

// --- ITEM & GROUP REPLACEMENTS (No changes needed for these) ---

// SelectGroup becomes <optgroup>
function SelectGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"optgroup">) {
  return (
    <optgroup
      data-slot="select-group"
      className={cn("text-popover-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

// SelectItem becomes <option>
function SelectItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"option">) {
  return (
    <option
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground py-1.5 pl-2 pr-8 text-sm outline-hidden",
        className
      )}
      {...props}
    >
      {children}
    </option>
  )
}

// --- UTILITY/DECORATIVE REPLACEMENTS (No changes needed for these) ---

// SelectLabel becomes a <span> for non-interactive labeling
function SelectLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

// SelectSeparator becomes a simple <div>
function SelectSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

// Scroll buttons are non-functional placeholders
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </div>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </div>
  )
}


export {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}