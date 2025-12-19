"use client";

import { useRef } from "react";
import { X, Upload } from "lucide-react";
import { SimpleEditor } from "../../../../components/tiptap/tiptap-templates/simple/simple-editor";
import { config } from "../../../../shared/constants/config";
import type { BlogSection } from "../../../../shared/types/types";



interface BlogSectionCardProps {
  section: BlogSection;
  index: number;
  errors?: {
    sectionTitle?: string;
    content?: string;
    image?: string;
  };
  onUpdate: (field: keyof BlogSection, value: string | File) => void;
  onRemove: () => void;
}

export function BlogSectionCard({
  section,
  index,
  errors,
  onUpdate,
  onRemove,
}: BlogSectionCardProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getImageUrl = (img?: File | string) => {
    if (!img) return "/placeholder.svg";
    if (typeof img === "string") return `${config.VITE_BASE_IMG_URL}${img}`;
    return URL.createObjectURL(img);
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Section {index + 1}</h3>

        <button
          type="button"
          onClick={onRemove}
          className="rounded-md border border-black p-2 text-red-600 hover:bg-red-600 hover:text-white hover:border-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Section Title */}
      <div>
        <label className="block text-sm font-medium mb-2">Section Title</label>

        <input
          type="text"
          placeholder="Enter section title..."
          value={section.sectionTitle}
          onChange={(e) => onUpdate("sectionTitle", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />

        {errors?.sectionTitle && (
          <p className="mt-1 text-sm text-red-600">{errors.sectionTitle}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-2">Content</label>

        <div className="border border-gray-300 rounded-2xl">
          <SimpleEditor
            setNewPostRichText={(html) => onUpdate("content", html)}
            initialContent={section.content}
          />
        </div>

        {errors?.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Section Image</label>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpdate("image", file);
          }}
          className="hidden"
        />

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </button>

          {section.image && (
            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium">
              Image uploaded
            </span>
          )}
        </div>

        {errors?.image && (
          <p className="mt-1 text-sm text-red-600">{errors.image}</p>
        )}

        {section.image && (
          <div className="mt-4">
            <img
              src={getImageUrl(section.image)}
              alt="Section preview"
              className="max-w-xs rounded-lg shadow-sm"
            />
          </div>
        )}
      </div>
    </section>
  );
}
