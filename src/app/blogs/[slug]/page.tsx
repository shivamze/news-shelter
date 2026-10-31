"use client";
import Link from "next/link";
import { ArrowLeft, Share2, Bookmark, Calendar } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import ArticleContent from "@/src/app/components/ArticleContent";

interface Props {
  params: { slug: string };
}

type Blog = {
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  publishedAt: string;
  author: string;
  profession?: string;
  profileImage?: string;
};

export default function BlogPageDetails({ params }: Props) {
  const [article, setArticle] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blog/${params.slug}`);
        setArticle(res.data.data);
      } catch (err: any) {
        if (err.response?.status === 404) setNotFound(true);
        else toast.error("Could not load blog post");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [params.slug]);

  const copyCurrentPageUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-3xl animate-pulse">
          <div className="aspect-[16/9] bg-gray-200 rounded-xl mb-6" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Blog post not found
        </h1>
        <p className="text-gray-600 mb-6">It may have been removed.</p>
        <Link href="/blogs" className="text-blue-600 hover:underline">
          ← Back to Opinion
        </Link>
      </div>
    );
  }

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-8 pb-28 md:pb-10">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opinion</span>
        </Link>

        <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          {article.imageUrl && (
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-10">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 text-sm text-gray-600">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white capitalize">
                {article.category}
              </span>
              {date && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={article.publishedAt}>{date}</time>
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 mb-6">
              {article.title}
            </h1>

            {/* Author block */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
              {article.profileImage ? (
                <img
                  src={article.profileImage}
                  alt={article.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                  {article.author?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">{article.author}</p>
                {article.profession && (
                  <p className="text-sm text-gray-500 capitalize">
                    {article.profession}
                  </p>
                )}
              </div>
            </div>

            <ArticleContent content={article.content} />
          </div>
        </article>

        {/* Mobile action bar */}
        <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-around shadow-lg z-40">
          <button
            onClick={copyCurrentPageUrl}
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-xs">Share</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
            <Bookmark className="w-5 h-5" />
            <span className="text-xs">Save</span>
          </button>
        </div>

        {/* Desktop floating buttons */}
        <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-3">
          <button
            onClick={copyCurrentPageUrl}
            aria-label="Copy link"
            className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-lg transition-all"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            aria-label="Save article"
            className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-lg transition-all"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
