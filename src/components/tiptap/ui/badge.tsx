import * as React from "react"
// We keep 'cva' and 'type VariantProps' as they are not Radix components
import { cn } from "../../../lib/tiptap-utils"

// The props definition must change slightly since we are manually handling 'asChild'.
// We use a generic Element type to allow it to be rendered as an 'a', 'div', etc.
interface BadgeProps extends React.ComponentProps<"span"> {
  // We rename asChild to as and make it accept an element type or string
  as?: React.ElementType
}

function Badge({
  className,
  // Use 'as' instead of 'asChild' to represent the component type to render
  as: Comp = "span",
  ...props
}: BadgeProps) {

  return (
    <Comp
      data-slot="badge"
      className={cn( className)}
      {...props}
    />
  )
}

export { Badge }