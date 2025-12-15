import * as React from "react"
import { cn } from "../../../lib/tiptap-utils"

// Define props to match the original structure, using a native 'label' tag
interface LabelProps extends React.ComponentPropsWithoutRef<"label"> {
  className?: string
}

function Label({
  className,
  ...props
}: LabelProps) {
  return (
    <label
      data-slot="label"
      // The native HTML <label> tag automatically links to an input element
      // when the 'htmlFor' prop is provided, or when the input is a child.
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }