"use client"

import type { BlogPost } from "../../../../shared/types/types"


interface BlogHeaderProps {
  blogPost: BlogPost | undefined
  isOwner: boolean
  onEdit: () => void
  onDelete: () => void
  onBack: () => void
}

export default function BlogHeader({ blogPost, isOwner, onEdit, onDelete, onBack }: BlogHeaderProps) {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Blog Preview</h1>
      <div className="flex gap-2">
        {isOwner && blogPost && (
          <>
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </>
        )}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>
    </header>
  )
}
