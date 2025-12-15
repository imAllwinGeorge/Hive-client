"use client";

import { Save, Type } from "lucide-react";
import { config } from "../../../../shared/constants/config";
import type { BlogSection } from "../../../../shared/types/types";

interface BlogPreviewProps {
  title: string;
  author: string;
  introduction: string;
  sections: BlogSection[];
  image: File | string;
  onEdit: () => void;
  onSave: () => void;
}

export function BlogPreview({
  title,
  author,
  introduction,
  sections,
  image,
  onEdit,
  onSave,
}: BlogPreviewProps) {
  const getImageUrl = (img: File | string | undefined) => {
    if (!img) return "/placeholder.svg";
    if (typeof img === "string") return `${config.VITE_BASE_IMG_URL}${img}`;
    return URL.createObjectURL(img);
  };

  const tableOfContents = sections.filter(
    (section) => section.sectionTitle.trim() !== ""
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Blog Preview</h1>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <Type className="w-4 h-4" />
              Edit
            </button>

            <button
              type="button"
              onClick={onSave}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
            >
              <Save className="w-4 h-4" />
              Save Blog
            </button>
          </div>
        </div>

        {/* Content Wrapper */}
        <section className="bg-white border border-gray-200 rounded-xl p-8">
          {/* Blog Header */}
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">
              {title || "Your Blog Title"}
            </h1>

            {introduction && (
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
                {introduction}
              </p>
            )}

            {author && (
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
                {author}
              </p>
            )}

            {image && (
              <div className="mb-4">
                <img
                  src={getImageUrl(image)}
                  alt={title}
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </header>

          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <aside className="mb-10 rounded-lg border-l-4 border-gray-900 bg-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                Table of Contents
                <span className="text-xs rounded-full bg-gray-200 px-2 py-0.5">
                  Show
                </span>
              </h3>

              <ul className="space-y-1">
                {tableOfContents.map((section, index) => (
                  <li key={index}>
                    <a
                      href={`#section-${index}`}
                      className="text-gray-900 hover:underline"
                    >
                      {section.sectionTitle}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Blog Sections */}
          {sections.map((section, index) => (
            <section key={index} id={`section-${index}`} className="mb-10">
              {section.sectionTitle && (
                <h2 className="text-2xl font-bold mb-4">
                  {section.sectionTitle}
                </h2>
              )}

              {section.content && (
                <div className="mb-4 space-y-4">
                  {section.content.split("\n").map((paragraph, idx) => (
                    <p key={idx} className="text-gray-800 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {section.image && (
                <div className="mb-4">
                  <img
                    src={getImageUrl(section.image)}
                    alt={section.sectionTitle}
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </section>
          ))}
        </section>
      </div>
    </div>
  );
}
