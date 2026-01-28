"use client"
import Link from "next/link";
import { ArrowLeft, Share2, Bookmark, Calendar, User } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  params: { slug: string };
}

export default function NewsPageDetails({ params }: Props) {
  const [article, setArticle] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "",
    publishedAt: "",
  });

//   const { id } = params;

  useEffect(() => {
    const newsDetail = async () => {
      try {

        const viewedKey = `viewed_${params.slug}`;

        if (!sessionStorage.getItem(viewedKey)) {
          const viewsRes = await axios.put(`/api/news/${params.slug}/view`);
          console.log("views updated:", viewsRes.data.views);

          sessionStorage.setItem(viewedKey, "true");
        }
        
        const res = await axios.get(`/api/news/${params.slug}`);
        console.log("fetching success");

        console.log(res);

        setArticle(res.data.data);
      } catch (error: any) {
        console.log("error in data fetching", error);
      }
    };

    newsDetail();
  }, [params]);

  const copyCurrentPageUrl = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);

      // Temporary popup (V1 simple)
      showFlashMessage("Link copied to clipboard");

      return true;
    } catch (error) {
      console.error("Clipboard copy failed:", error);
      return false;
    }
  };

  const showFlashMessage = (message: string) => {
    const div = document.createElement("div");
    div.innerText = message;

    div.style.position = "fixed";
    div.style.bottom = "24px";
    div.style.left = "50%";
    div.style.transform = "translateX(-50%)";
    div.style.background = "#1f2937"; // gray-800
    div.style.color = "#fff";
    div.style.padding = "8px 16px";
    div.style.borderRadius = "8px";
    div.style.fontSize = "14px";
    div.style.zIndex = "9999";
    div.style.opacity = "0";
    div.style.transition = "opacity 0.3s ease";

    document.body.appendChild(div);

    requestAnimationFrame(() => {
      div.style.opacity = "1";
    });

    setTimeout(() => {
      div.style.opacity = "0";
      setTimeout(() => div.remove(), 300);
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs bg-blue-500">
                {article.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <time className="text-xs text-gray/80">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>

              {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  {article.author}
                </div> */}
            </div>

            <h1 className="text-3xl md:text-4xl text-gray-900 mb-4">
              {article.title}
            </h1>

            {/* Description */}
            {/* <p className="text-lg text-gray-700 mb-8 pb-8 border-b border-gray-200">
                {article.description}
              </p> */}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                {article.content}
              </p>
            </div>
          </div>
        </article>

        <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-around shadow-lg">
          <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
            <Share2 className="w-5 h-5" />
            <span className="text-xs">Share</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
            <Bookmark className="w-5 h-5" />
            <span className="text-xs">Save</span>
          </button>
        </div>

        {/* Desktop Share Buttons */}
        <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-3">
          <button onClick={copyCurrentPageUrl} className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-lg transition-all">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-lg transition-all">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}