// src/features/user/hooks/useUserBlogs.js
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api/axiosInstance";
import { API_ROUTES } from "../../../shared/constants/apiRoutes";
import { extractApiError } from "../../../utils";
import type { BlogPost } from "../../../shared/types/types";
import { HttpStatusCode } from "../../../shared/constants/constants";

export function useUserBlogs({ page = 1, limit = 10 } = {}) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_ROUTES.USER.getBlogs(page, limit)
      );

      if (response.status === HttpStatusCode.OK) {
        setBlogs(response.data.blogs);
        setTotal(response.data.total || 0);
        setError(null);
      }
    } catch (err) {
      setError(extractApiError(err) || "Failed to load your blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return {
    blogs,
    total,
    loading,
    error,
    reload: fetchMyBlogs,
  };
}
