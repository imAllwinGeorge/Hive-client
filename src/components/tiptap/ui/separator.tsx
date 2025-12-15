import * as React from "react"
import { cn } from "../../../lib/tiptap-utils"

// Define props to match the original structure, using a div as the underlying element
interface SeparatorProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
  // 'orientation' determines the styling (horizontal/vertical)
  orientation?: "horizontal" | "vertical"
  // 'decorative' determines if the element is purely visual or has a semantic role
  // We handle this by setting the 'role' attribute conditionally
  decorative?: boolean
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  // Determine the ARIA role based on the 'decorative' prop
  const role = decorative ? "none" : "separator"

  // Determine the correct class names based on the orientation
  const orientationClasses =
    orientation === "horizontal"
      ? // Styles for horizontal orientation: full width, 1px height
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full"
      : // Styles for vertical orientation: full height, 1px width
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
        
  // The base classes are always applied
  const baseClasses = "bg-border shrink-0"
  
  // Note: We are keeping the Radix-style data-attributes in the class names 
  // (data-[orientation=...]) for consistency, even though they aren't strictly
  // necessary for this simple component. The combined `cn` call handles the sizing.

  return (
    <div
      data-slot="separator"
      // Mimic the Radix structure by setting the orientation attribute
      data-orientation={orientation}
      // Set the ARIA role
      role={role}
      className={cn(
        baseClasses,
        orientationClasses,
        // The following combines the logic:
        // Horizontal: h-px w-full
        // Vertical: h-full w-px
        // We use the combined classes from the original component for precise styling
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }