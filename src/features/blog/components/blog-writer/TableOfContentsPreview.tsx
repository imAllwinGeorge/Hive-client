"use client";

import { List } from "lucide-react";
import type { BlogSection } from "../../../../shared/types/types";

interface TableOfContentsPreviewProps {
  sections: BlogSection[];
}

export function TableOfContentsPreview({
  sections,
}: TableOfContentsPreviewProps) {
  const validSections = sections.filter(
    (section) => section.sectionTitle.trim() !== ""
  );

  if (validSections.length === 0) {
    return null;
  }

  return (
    <section className="mb-6 rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 px-6 py-4">
        <List className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">
          Table of Contents Preview
        </h3>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <div className="rounded-lg border-l-4 border-gray-900 bg-gray-50 p-4">
          <h4 className="mb-3 font-semibold text-gray-900">
            Table of Contents
          </h4>

          <ul className="space-y-1">
            {validSections.map((section, index) => (
              <li key={index} className="text-gray-900">
                {index + 1}. {section.sectionTitle}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
