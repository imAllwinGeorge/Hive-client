"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { BlogPost } from "../../../shared/types/types";
import { config } from "../../../shared/constants/config";
import toast from "react-hot-toast";
import Loading from "../../../components/Loader/Loading";
import { blogApi } from "../../../api/blogApi";
import { formatDate } from "../../../utils";
import Pagination from "../../../components/pagination/Pagination";
import { useDebounce } from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

export default function BlogHomepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredPosts, setFeturedPosts] = useState<BlogPost[]>([]);
  const [sidebarPosts, setSidebarPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const homeData = await blogApi.getHomeData(debouncedSearch, page);
        console.log(homeData);
        setFeturedPosts(homeData.featuredPosts);
        setSidebarPosts(homeData.sidebarPosts);
        setTotalPages(homeData.total);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedSearch, page]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* <p className="text-sm text-gray-600 mb-4">Blog</p> */}
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Discover our latest news
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-lg">
            Discover the achievements that set us apart. From groundbreaking
            projects to industry accolades, we take pride in our
            accomplishments.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Input Placeholder"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Find Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Large Blog Cards */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Whiteboards are remarkable.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/blog/${post._id}`)}
                >
                  <div className="relative h-64">
                    <img
                      src={
                        `${config.VITE_BASE_IMG_URL}${post.image}` ||
                        "/placeholder.svg"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {post.author}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {post.introduction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>

          {/* Right Sidebar - Featured Posts */}
          <div className="lg:w-80">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured</h2>

            <div className="space-y-6">
              {sidebarPosts.map((post) => (
                <div key={post._id} className="flex gap-4 group cursor-pointer">
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={
                        `${config.VITE_BASE_IMG_URL}${post.image}` ||
                        "/placeholder.svg"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(post.createdAt)}
                    </p>
                    <h3 className="text-base font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
