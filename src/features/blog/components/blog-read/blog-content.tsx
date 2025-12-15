import { config } from "../../../../shared/constants/config"
import type { BlogPost } from "../../../../shared/types/types"
import BlogSection from "./blog-section"


interface BlogContentProps {
  blogPost: BlogPost
}

export default function BlogContent({ blogPost }: BlogContentProps) {
  return (
    <article className="bg-card shadow-md rounded-lg border border-border">
      <div className="p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">{blogPost.title || "Your Blog Title"}</h1>
          {blogPost.introduction && (
            <div className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: blogPost.introduction }} />
          )}
          {blogPost.image && (
            <div className="mb-4">
              <img
                src={`${config.VITE_BASE_IMG_URL}${blogPost.image}`}
                alt={blogPost.title}
                className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </header>

        {blogPost.sections.map((section, index) => (
          <BlogSection
            key={index}
            sectionTitle={section.sectionTitle}
            content={section.content}
            image={section.image}
            index={index}
          />
        ))}
      </div>
    </article>
  )
}
