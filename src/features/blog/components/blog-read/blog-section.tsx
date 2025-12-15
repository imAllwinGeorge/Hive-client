import { config } from "../../../../shared/constants/config"

interface BlogSectionProps {
  sectionTitle?: string
  content?: string
  image?: string
  index: number
}

export default function BlogSection({ sectionTitle, content, image, index }: BlogSectionProps) {
  return (
    <section id={index.toString()} className="mb-8">
      {sectionTitle && <h2 className="text-2xl font-bold mb-4 text-foreground">{sectionTitle}</h2>}
      {content && (
        <div className="prose max-w-none mb-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: content }} />
      )}
      {image && (
        <div className="mb-4">
          <img
            src={`${config.VITE_BASE_IMG_URL}${image}` || "/placeholder.svg"}
            alt={sectionTitle || "Section image"}
            className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </section>
  )
}
