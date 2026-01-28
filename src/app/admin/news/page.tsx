"use client"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"
import axios from "axios";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export default function News(){
      const [recentNews, setRecentNews] = useState<any[]>([]);
      const [page, setPage] = useState(1);
      const [hasMore, setHasMore] = useState(true);
      const [loading, setLoading] = useState(false);

      const fetchNews = async (pageNumber: number) => {
        try {
          setLoading(true);

          const res = await axios.get("/api/admin/news", {
            params: {
              page: pageNumber,
              limit: 6,
            },
          });

          const { data, pagination } = res.data;

          setRecentNews((prev) => (pageNumber === 1 ? data : [...prev, ...data]));

          setHasMore(pagination.hasMore);

          console.log("data fetched successfully: ", res.data.data);
        } catch (err) {
          console.log("backend data retrieval failed");
          return err;
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchNews(1);
      }, []);

      const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchNews(nextPage);
      };

      const handleDelete = async (id: string) => {
        try {
          console.log(id);
          await axios.delete(`/api/admin/news/${id}`);
          setRecentNews(recentNews.filter((article) => article._id !== id));
        } catch (err: any) {
          console.log("error deleting the news post", err);
        }
      };

      const updateStatus = async (id: string, status: string) => {
        try {
          await axios.patch(`/api/admin/news/${id}`, { status });

          setRecentNews((prev) =>
            prev.map((item) => (item._id === id ? { ...item, status } : item)),
          );

          toast.success("Status updated");
        } catch (err: any) {
          toast.error(err?.response?.data?.message || "Error updating status");
        }
      };

    return (
      <div className="text-gray-100 p-2">
        <div className="bg-blue-700 m-2 p-2 font-bold w-35">
          <Link href="/admin/news/create" className="flex">
            News Post <Plus className="w-5 h-5 my-0.5 ml-2 stroke-1" />
          </Link>
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
                  <tr key={article._id} className="hover:bg-gray-50">
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
                      {new Date(article.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 rounded-full bg-green-100 text-green-800">
                        <select
                          value={article.status}
                          onChange={(e) =>
                            updateStatus(article._id, e.target.value)
                          }
                          className=" px-2 py-1 text-sm"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/news/update/${article._id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(article._id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {hasMore && (
            <div className="flex justify-center">
              <button
                disabled={loading}
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 m-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {loading ? "Loading..." : "Load More Articles"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
}