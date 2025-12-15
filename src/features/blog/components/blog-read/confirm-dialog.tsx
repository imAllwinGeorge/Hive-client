"use client"

import { useEffect, useRef } from "react"

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="rounded-lg border border-border shadow-lg backdrop:bg-black/50 p-0 max-w-md w-full"
    >
      <div className="bg-card p-6">
        <h2 className="text-xl font-bold mb-4 text-foreground">{title}</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-border rounded-md bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  )
}
