"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import { Edit, Trash2, FileText, PenLine, Eye, TrendingUp } from "lucide-react";

export default function AdminDashboard(){
    const [recentNews, setRecentNews] = useState<any[]>([]);
    const [blogLength, setBlogLength] = useState<number>(0);
    const [totalViews, setTotalViews] = useState<number>(0);
    const [totalNews, setTotalNews] = useState<number>(0);

    useEffect(() => {
      const fetchNews = async () => {
        try {
          const res = await axios.get("/api/admin/news");
          const response = await axios.get("/api/blog");
          console.log("data fetched successfully: ", res.data.data);
          setRecentNews(res.data.data);
          setTotalNews(res.data.totalNews);
          

          setBlogLength(response.data.data.length);

          const viewsRes = await axios.get("/api/admin/total-views");
          setTotalViews(viewsRes.data.totalViews);

          console.log("total views fetched: ", viewsRes.data.totalViews);
        } catch (err) {
          console.log("backend data retrieval failed");
          return err;
        }
      };
      fetchNews();
    }, []);

    const stats = [
      {
        label: "Total News",
        value: totalNews,
        icon: FileText,
        color: "bg-blue-100 text-blue-600",
      },
      {
        label: "Blog Posts",
        value: blogLength,
        icon: PenLine,
        color: "bg-purple-100 text-purple-600",
      },
      {
        label: "Total Views",
        value: totalViews,
        icon: Eye,
        color: "bg-green-100 text-green-600",
      },
      {
        label: "Engagement",
        value: "+12%",
        icon: TrendingUp,
        color: "bg-orange-100 text-orange-600",
      },
    ];
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's an overview of your content.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-2xl text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg text-gray-900">Recent News Articles</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentNews.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-900 truncate">
                            {article.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {article.author}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(article.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}