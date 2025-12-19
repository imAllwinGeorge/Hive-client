"use client";

import { useEffect, useState } from "react";
import { BlogHeaderForm } from "../components/blog-writer/BlogHeaderForm";
import Button from "../../../components/UI/Button";
import {
  BlogSectionCard,
} from "../components/blog-writer/BlogSectionCard";
import { TableOfContentsPreview } from "../components/blog-writer/TableOfContentsPreview";
import { blogApi } from "../../../api/blogApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { useNavigate, useParams } from "react-router-dom";
import type { BlogPost, BlogSection } from "../../../shared/types/types";

export default function EditBlog() {
    const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const user = useSelector((state: RootState) => state.auth.user);
  const [blogPost, setBlogPost] = useState<BlogPost>({
      _id: "",
      userId: user?._id as string,
      title: "",
      author: "",
      introduction: "",
      sections: [{
        sectionTitle: "",
  content: "",
  image: "",  
      }],
      image: "",
      views: 0,
      likes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );

  const [errors, setErrors] = useState<{
    title?: string;
    author?: string;
    introduction?: string;
    image?: string;
    sectionlength?: string;
    sections?: {
      sectionTitle?: string;
      content?: string;
      image?: string;
    }[];
  }>({});

  const addNewSection = () => {
    const newSection: BlogSection = {
      sectionTitle: "",
      content: "",
      image: undefined,
    };
    setBlogPost((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const updateSection = (
    selectedIndex: number,
    field: keyof BlogSection,
    value: string | File
  ) => {
    setBlogPost((prev) => ({
      ...prev,
      sections: prev.sections.map((section, index) =>
        index === selectedIndex ? { ...section, [field]: value } : section
      ),
    }));
  };

  const removeSection = (selectedIndex: number) => {
    setBlogPost((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, index) => index !== selectedIndex),
    }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!blogPost.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!blogPost.introduction.trim()) {
      newErrors.introduction = "Introduction is required";
    }
    if (!blogPost.author.trim()) {
      newErrors.author = "Please provide author name.";
    }
    if (!blogPost.image) {
      newErrors.image = "Please upload a cover image.";
    }

    if (blogPost.sections.length <= 0) {
      newErrors.sectionlength = "Atleast one section required.";
    }

    const sectionErrors: {
      sectionTitle?: string;
      content?: string;
      image?: string;
    }[] = [];

    blogPost.sections.forEach((section, index) => {
      const secError: {
        sectionTitle?: string;
        content?: string;
        image?: string;
      } = {};

      if (!section.sectionTitle.trim()) {
        secError.sectionTitle = "Please provide a section title";
      }
      if (!section.content.trim()) {
        secError.content = "This field cannot be empty";
      }
      if (!section.image) {
        secError.image = "Please upload an image.";
      }

      if (Object.keys(secError).length > 0) {
        sectionErrors[index] = secError;
      }
    });

    if (sectionErrors.length > 0) {
      newErrors.sections = sectionErrors;
    }

    return newErrors;
  };

  const submitData = async (formData: FormData) => {
    console.log(formData);
    try {
      const blog = await blogApi.editBlog(blogPost._id, formData);
      console.log("create blog: ", blog);
      navigate(`/blog/${blog._id}`)
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const editBlog = () => {
    console.log("Saving blog post:", blogPost);

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("userId", blogPost.userId);
    formData.append("title", blogPost.title);
    formData.append("author", blogPost.author);
    formData.append("introduction", blogPost.introduction);

    const sectionsWithoutFiles = blogPost.sections.map((section, index) => {
      const sec: object = {
        sectionTitle: section.sectionTitle,
        content: section.content,
        hasImage: section.image instanceof File,
        imageIndex: section.image instanceof File ? index : null,
      };
      return sec;
    });

    formData.append("sections", JSON.stringify(sectionsWithoutFiles));

    blogPost.sections.forEach((section, index) => {
      if (section.image instanceof File) {
        formData.append(`section-image-${index}`, section.image);
      }
      console.log(typeof section.image);
    });

    if (blogPost.image instanceof File) {
      formData.append("coverImage", blogPost.image);
    }

    for (const [key, value] of formData.entries()) {
      console.log(`formdata values ${key}:`, value);
    }

    submitData(formData);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await blogApi.getBlog(id as string);
        setBlogPost(blog);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };
    fetchBlog();
  }, [id]);

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Blog Post</h1>
          <div className="flex gap-2">
            <Button
              onClick={editBlog}
              className="px-4 text-white bg-green-400 hover:bg-green-600 "
            >
              Save Draft
            </Button>
          </div>
        </div>

        {/* Blog Header Form */}
        <BlogHeaderForm
          title={blogPost.title}
          author={blogPost.author}
          introduction={blogPost.introduction}
          image={blogPost.image}
          errors={errors}
          onTitleChange={(value) =>
            setBlogPost((prev) => ({ ...prev, title: value }))
          }
          onAuthorChange={(value) =>
            setBlogPost((prev) => ({ ...prev, author: value }))
          }
          onIntroductionChange={(value) =>
            setBlogPost((prev) => ({ ...prev, introduction: value }))
          }
          onImageChange={(file) =>
            setBlogPost((prev) => ({ ...prev, image: file }))
          }
        />

        {errors.sectionlength && (
          <span className="text-destructive block mb-4">
            {errors.sectionlength}
          </span>
        )}

        {/* Table of Contents Preview */}
        <TableOfContentsPreview sections={blogPost.sections} />

        {/* Blog Sections */}
        <div className="space-y-6">
          {blogPost.sections.map((section, index) => (
            <BlogSectionCard
              key={index}
              section={section}
              index={index}
              errors={errors.sections?.[index]}
              onUpdate={(field, value) => updateSection(index, field, value)}
              onRemove={() => removeSection(index)}
            />
          ))}
        </div>

        {/* Add Section Button */}
        <Button
          onClick={addNewSection}
          className="w-full mt-6 bg-black text-white"
        >
          Add New Section
        </Button>
      </div>
    </div>
  );
}
