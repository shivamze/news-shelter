"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";

export default function Create() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    source: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchData = async() => {
        try{
            setLoading(true);

            const res = await axios.get("/api/admin/news/");
            const news = res.data;
            console.log(news);
            setFormData({
                title: news.title,
                category: news.category,
                source: news.source,
                content: news.content,
            })
        }catch(err: any){
            console.log("error in fetching news data for edit",err);
        }
    }
  })

  const PublishNews = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("please select an Image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("source", formData.source);
      data.append("content", formData.content);
      data.append("image", imageFile);

      setFormData({ title: "", category: "", source: "", content: "" });
      setImageFile(null);

      await axios.post("/api/admin/news", data);
      toast.success("News published successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow text-black">
      <h1 className="text-2xl font-semibold mb-6">Create News</h1>

      <form onSubmit={PublishNews} className="space-y-5">
        {/* Title */}
        <input
          name="title"
          placeholder="News Title"
          className="w-full p-3 border rounded-lg"
          onChange={handleChange}
          required
        />

        {/* Category */}
        <select
          name="category"
          className="w-full p-3 border rounded-lg"
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Politics">Politics</option>
          <option value="Tech">Tech</option>
          <option value="Business">Business</option>
          <option value="Sports">Sports</option>
        </select>

        {/* Source */}
        <input
          name="source"
          placeholder="Source (ANI, Reuters...)"
          className="w-full p-3 border rounded-lg"
          onChange={handleChange}
          required
        />
        {/* Image Upload */}
        <div className="flex border rounded-lg">
          <Upload className="my-2 ml-2" />
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border-none "
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Content */}
        <textarea
          name="content"
          rows={6}
          placeholder="News content..."
          className="w-full p-3 border rounded-lg"
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Publishing..." : "Publish News"}
        </button>
      </form>
    </div>
  );
}
