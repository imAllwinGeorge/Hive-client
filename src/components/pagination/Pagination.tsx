"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }
  console.log(totalPages, currentPage)
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="flex items-center justify-center w-10 h-10 text-gray-500">
              ...
            </span>
          )
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-colors ${
              currentPage === page
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        )
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
