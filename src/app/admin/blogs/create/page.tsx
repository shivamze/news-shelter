"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";

export default function Create() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [authorImage, setAuthorImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
    profession: "",
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
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAuthorImage(e.target.files[0]);
    }
  };

  const PublishBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("please select an Image");
      return;
    }
    if (!authorImage) {
      toast.error("please select an Image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("author", formData.author);
      data.append("content", formData.content);
      data.append("profession", formData.profession);
      data.append("blogImage", imageFile);
      data.append("profileImage", authorImage);

      setFormData({ title: "", category: "", author: "", content: "",  profession: ""});
      setImageFile(null);
      setAuthorImage(null);

      await axios.post("/api/admin/blog", data);
      toast.success("News published successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow text-black">
      <h1 className="text-2xl font-semibold mb-6">Create Blog</h1>

      <form onSubmit={PublishBlog} className="space-y-5">
        {/* Title */}
        <input
          name="title"
          placeholder="Blog Title"
          className="w-full p-3 border rounded-lg"
          onChange={handleChange}
          value={formData.title}
          required
        />

        {/* Category */}
        <select
          name="category"
          className="w-full p-3 border rounded-lg"
          onChange={handleChange}
          value={formData.category}
          required
        >
          <option value="">Select Category</option>
          <option value="politics">Politics</option>
          <option value="t">Tech</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="world">World</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="economy">Economy</option>
          <option value="social">Social</option>
        </select>

        {/* Source */}
        <input
          name="author"
          placeholder="Author Name"
          className="w-full p-3 border rounded-lg"
          onChange={handleChange}
          value={formData.author}
          required
        />
        <input
          name="profession"
          placeholder="Profession"
          className="w-full p-3 border rounded-lg"
          onChange={handleChange}
          value={formData.profession}
          required
        />
        {/* Image Upload */}
        <label htmlFor="blogImage" className="font-bold">
          Image
        </label>
        <div className="flex border rounded-lg">
          <Upload className="my-2 ml-2" />
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border-none "
            onChange={handleImageChange}
            placeholder="blog Image"
            required
          />
        </div>

        <label htmlFor="profileImage" className="font-bold">
          Author Image
        </label>
        <div className="flex border rounded-lg">
          <Upload className="my-2 ml-2" />
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border-none "
            onChange={handleProfileChange}
            placeholder="author Image"
            required
          />
        </div>

        {/* Content */}
        <textarea
          name="content"
          rows={6}
          placeholder="Blog content..."
          className="w-full p-3 border rounded-lg"
          onChange={handleChange}
          value={formData.content}
          required
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
