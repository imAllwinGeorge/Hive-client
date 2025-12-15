import * as React from "react"
import { cn } from "../../../lib/tiptap-utils"

// --- 1. Avatar (Root) ---
// Replaces AvatarPrimitive.Root with a <div>

interface AvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
}

function Avatar({
  className,
  ...props
}: AvatarProps) {
  // The outer div acts as the container/root, defining the size and shape.
  return (
    <div
      data-slot="avatar"
      className={cn(
        // Base styling for the container
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

// --- 2. AvatarImage ---
// Replaces AvatarPrimitive.Image with an <img>

interface AvatarImageProps extends React.ComponentPropsWithoutRef<"img"> {
  className?: string
}

function AvatarImage({
  className,
  ...props
}: AvatarImageProps) {
  // The img tag holds the actual image.
  return (
    // Note: Radix AvatarImage handles loading/error state. This simple replacement does not.
    <img
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

// --- 3. AvatarFallback ---
// Replaces AvatarPrimitive.Fallback with a <div>

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
}

function AvatarFallback({
  className,
  ...props
}: AvatarFallbackProps) {
  // The fallback div is typically shown when the image fails to load.
  return (
    <div
      data-slot="avatar-fallback"
      className={cn(
        // Styling to center content (like initials) and fill the container
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }