import * as React from "react"
import { cn } from "../../../lib/tiptap-utils"

// Define the component props, similar to the Radix Switch Root
interface SwitchProps extends React.ComponentPropsWithoutRef<"input"> {
  className?: string
  // You might need to add an explicit 'checked' prop if you want to control it externally
  checked?: boolean
  // You might need to add an explicit 'onCheckedChange' prop for controlled state
  onCheckedChange?: (checked: boolean) => void
}

function Switch({
  className,
  checked: controlledChecked,
  onCheckedChange,
  // Extract and omit props that should go on the input element
  ...props
}: SwitchProps) {
  // Use uncontrolled state internally if 'checked' prop is not provided
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(
    props.defaultChecked || false
  )

  // Determine the current checked state based on whether it is controlled
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : uncontrolledChecked

  // Handle change event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked
    if (!isControlled) {
      setUncontrolledChecked(newChecked)
    }
    // Call the provided handler if it exists
    if (onCheckedChange) {
      onCheckedChange(newChecked)
    }
  }

  /* * The structure uses:
   * 1. A visually hidden input[type="checkbox"] to handle native state/accessibility.
   * 2. A wrapping div for the track (styled like SwitchPrimitive.Root).
   * 3. An inner div for the thumb (styled like SwitchPrimitive.Thumb).
   * * We use the hidden input's state to conditionally apply classes to the visual divs.
   */

  // Base classes for the track (mimicking the Root)
  const trackClasses = cn(
    // We are replacing Radix's data-[state=checked] with our own conditional classes
    checked ? "bg-primary" : "bg-input dark:bg-input/80",
    "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
    "relative", // Make it relative for absolute positioning of the thumb
    className
  )

  // Base classes for the thumb (mimicking the Thumb)
  const thumbClasses = cn(
    "bg-background dark:bg-primary-foreground", // Initial background
    checked
      ? "translate-x-[calc(100%-2px)] dark:bg-primary-foreground" // When checked
      : "translate-x-0 dark:bg-foreground", // When unchecked (adjusting dark mode thumb color for 'unchecked' state)
    "pointer-events-none block size-4 rounded-full ring-0 transition-transform absolute left-0 top-1/2 -translate-y-1/2 ml-[2px]" // Positioning and transition
  )

  return (
    // We wrap everything in a label so clicking the track toggles the hidden input
    <label className="inline-block cursor-pointer">
      {/* 1. Visually hidden checkbox input for native state and accessibility */}
      <input
        type="checkbox"
        // Hide visually but keep accessible
        className="sr-only" 
        checked={checked}
        onChange={handleChange}
        {...props}
      />
      
      {/* 2. The visual Track/Root (div) */}
      <div
        data-slot="switch"
        className={trackClasses}
        // This div is now the visual representation of the switch track
      >
        {/* 3. The visual Thumb (div) */}
        <div
          data-slot="switch-thumb"
          className={thumbClasses}
        />
      </div>
    </label>
  )
}

export { Switch }