"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type News = {
  title: string;
  imageUrl: string;
  slug: string;
  category: string;
  publishedAt: string;
};

type Props = {
  articles: News[];
};

export default function FeaturedCarousel({ articles }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!articles.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [articles]);

  if (!articles.length) {
    return (
      <div className="w-full h-[400px] rounded-xl bg-gray-200 animate-pulse" />
    );
  }

  const current = articles[currentIndex];
  if (!current) return null;

  console.log(current.title);


  return (
    <div className="w-full relative bg-gray-900 rounded-xl overflow-hidden shadow-xl">
      <Link href={`/news/${current.slug}`} className="block">
        <div className="relative h-[400px] md:h-[500px]">
          <img
            src={current.imageUrl}
            alt={current.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="px-3 py-1 rounded-full text-xs bg-blue-500"
                >
                  {current.category}
                </span>
                <time className="text-xs text-white/80">
                  {new Date(current.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <h2 className="text-2xl md:text-4xl text-white mb-3 line-clamp-2">
                {current.title}
              </h2>
              {/* <p className="text-sm md:text-base text-white/90 line-clamp-2 max-w-2xl">
                {current.description}
              </p> */}
            </div>
          </div>
        </div>
      </Link>

      {/* Controls */}
      <button
        onClick={() =>
          setCurrentIndex(
            (prev) => (prev - 1 + articles.length) % articles.length,
          )
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % articles.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full"
      >
        <ChevronRight className="text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
