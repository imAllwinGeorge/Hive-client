"use client";

import type React from "react";
import { useRef } from "react";
import { Upload, Type } from "lucide-react";
import { SimpleEditor } from "../../../../components/tiptap/tiptap-templates/simple/simple-editor";

interface BlogHeaderFormProps {
  title: string;
  author: string;
  introduction: string;
  image: File | string;
  errors: {
    title?: string;
    author?: string;
    introduction?: string;
    image?: string;
  };
  onTitleChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onIntroductionChange: (value: string) => void;
  onImageChange: (file: File) => void;
}

export function BlogHeaderForm({
  title,
  author,
  introduction,
  image,
  errors,
  onTitleChange,
  onAuthorChange,
  onIntroductionChange,
  onImageChange,
}: BlogHeaderFormProps) {
  const coverImageRef = useRef<HTMLInputElement | null>(null);

  const getImageUrl = (img: File | string) => {
    if (!img) return "/placeholder.svg";
    if (typeof img === "string") return img;
    return URL.createObjectURL(img);
  };

  console.log(title, author, introduction);
  return (
    <section className="mb-6 border border-gray-200 rounded-xl p-6 bg-white">
      {/* Header */}
      <header className="flex items-center mb-6">
        <Type className="w-5 h-5 mr-2 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-900">Blog Header</h2>
      </header>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Blog Headline <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your blog headline..."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onTitleChange(e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Author */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Author Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onAuthorChange(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.author && (
              <p className="text-sm text-red-600 mt-1">{errors.author}</p>
            )}
          </div>
        </div>

        {/* Introduction */}
        <div>
          <label className="block text-sm font-medium mb-2">Introduction</label>
          <div className="border border-gray-300 rounded-2xl">
            <SimpleEditor
              setNewPostRichText={(html) => onIntroductionChange(html)}
              initialContent="Write introdution...."
            />
          </div>
          {errors.introduction && (
            <p className="text-sm text-red-600 mt-1">{errors.introduction}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Cover Image</label>

          <input
            type="file"
            accept="image/*"
            ref={coverImageRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageChange(file);
            }}
          />

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => coverImageRef.current?.click()}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
            >
              <Upload className="w-4 h-4" />
              Upload Image
            </button>

            {image && (
              <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                Image uploaded
              </span>
            )}
          </div>

          {errors.image && (
            <p className="text-sm text-red-600 mt-1">{errors.image}</p>
          )}

          {image && (
            <div className="mt-4">
              <img
                src={getImageUrl(image)}
                alt="Cover preview"
                className="max-w-xs rounded-lg shadow-sm"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
