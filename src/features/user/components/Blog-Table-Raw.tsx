"use client"

import { Eye, Edit2 } from "lucide-react"
import type { BlogPost } from "../../../shared/types/types"
import { useNavigate } from "react-router-dom"

interface BlogTableRowProps {
  blog: BlogPost
  slNo: number
}

export default function BlogTableRow({ blog, slNo }: BlogTableRowProps) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/blog/${blog._id}`)
  }

  const handleEdit = () => {
    navigate(`/edit/${blog._id}`)
  }

  // const handleDelete = () => {
  //   if (confirm("Are you sure you want to delete this blog?")) {
  //     console.log("[v0] Delete blog:", blog._id)
  //   }
  // }

  return (
    <tr className="border-b hover:bg-muted/50 transition-colors">
      <td className="px-6 py-4 text-sm">{slNo}</td>
      <td className="px-6 py-4 text-sm font-medium">{blog.title}</td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={handleView}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            title="View blog"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
            title="Edit blog"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          {/* <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            title="Delete blog"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button> */}
        </div>
      </td>
    </tr>
  )
}
