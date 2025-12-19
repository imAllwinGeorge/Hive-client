"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import type { BlogPost } from "../../../shared/types/types"
import ConfirmDialog from "../components/blog-read/confirm-dialog"
import BlogContent from "../components/blog-read/blog-content"
import BlogHeader from "../components/blog-read/blog-header"
import { blogApi } from "../../../api/blogApi"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store"


export default function BlogRead() {
  const params = useParams()
  const id = params.id as string
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.auth.user)
  const [blogPost, setBlogPost] = useState<BlogPost>()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)



  // Fetch blog post
  useEffect(() => {
    console.log("hwllo")
    const fetchBlog = async () => {
      console.log(id)
      try {
        const blog = await blogApi.getBlog(id)
        console.log(blog, id);
        setBlogPost(blog);
        navigate("/")
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    }
    fetchBlog()
  }, [id, navigate])

  const deleteBlog = async () => {
    if (!blogPost) return

    try {
      console.log(blogPost._id)
      const response = await blogApi.deleteBlog(blogPost._id)

      console.log(response)
      navigate("/")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  const isOwner = user?._id === blogPost?.userId

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-4xl mx-auto p-6">
        <BlogHeader
          blogPost={blogPost}
          isOwner={isOwner}
          onEdit={() => navigate(`/edit/${blogPost?._id}`)}
          onDelete={() => setIsDeleteDialogOpen(true)}
          onBack={() => navigate(-1)}
        />

        {blogPost && <BlogContent blogPost={blogPost} />}

        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={deleteBlog}
          title="Delete Blog"
          message="Do you want to delete this Blog?"
        />
      </div>
    </div>
  )
}
