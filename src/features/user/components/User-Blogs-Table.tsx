
import BlogTableRow from "./Blog-Table-Raw"
import { useUserBlogs } from "../hooks/useUserBlogs"

export default function UserBlogsTable() {
  const { blogs, loading, error } = useUserBlogs();

  if (loading) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <p className="text-muted-foreground">Loading blogs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">Your Blogs</h2>
        <p className="text-muted-foreground text-sm mt-1">{blogs.length} blogs published</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">SL No</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
              <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => <BlogTableRow key={blog._id} blog={blog} slNo={index + 1} />)
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                  No blogs published yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
