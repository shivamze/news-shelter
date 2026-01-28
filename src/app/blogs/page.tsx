"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import  BlogCard  from "@/src/app/components/BlogCard";
import { PenLine } from "lucide-react";

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    useEffect(() => {
      const fetchNews = async () => {
        try {
          const res = await axios.get("/api/blog");
          console.log("data fetched successfully: ", res.data.data);
          setBlogPosts(res.data.data);
        } catch (err) {
          console.log("backend data retrieval failed");
          return err;
        }
      };
      fetchNews();
    }, []);
    
    console.log(blogPosts);
    
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <PenLine className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl text-gray-900">
                Opinion & Analysis
              </h1>
              <p className="text-gray-600 mt-1">
                Expert perspectives and in-depth analysis
              </p>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Empty State for No Posts */}
        {blogPosts.length === 0 && (
          <div className="text-center py-16">
            <PenLine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No Blog Posts Yet</h3>
            <p className="text-gray-600">
              Check back soon for expert opinions and analysis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}