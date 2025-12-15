import * as React from "react"
import { cn } from "../../../lib/tiptap-utils"

// Define props to match the original Radix structure, using a div as the underlying element
interface ProgressProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
  /**
   * The current value of the progress bar. A number between 0 and 100.
   */
  value?: number | null | undefined
}

function Progress({
  className,
  value,
  ...props
}: ProgressProps) {
  // Ensure value is a number between 0 and 100, defaulting to 0 if null/undefined
  const normalizedValue = Math.max(0, Math.min(100, value || 0))
  
  // Calculate the required translation for the indicator
  // If value is 75, we translate X by -(100 - 75) = -25%
  const transformStyle = {
    transform: `translateX(-${100 - normalizedValue}%)`,
  }

  return (
    // 1. Root/Track (Outer Div)
    <div
      data-slot="progress"
      // Set the ARIA role and value attributes for accessibility
      role="progressbar"
      aria-valuenow={normalizedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        // The original track styling (background, height, width, overflow)
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {/* 2. Indicator (Inner Div) */}
      <div
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={transformStyle}
      />
    </div>
  )
}

export { Progress }