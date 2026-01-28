"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";

interface Props {
  params: { id: string };
}

export default function Update({ params }: Props) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
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
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`/api/admin/blog/${params.id}`);
        const blog = res.data.data;
        console.log(blog);
        setFormData({
          title: blog.title,
          category: blog.category,
          content: blog.content,
        });
        setExistingImage(blog.imageUrl);
      } catch (err: any) {
        console.log("error in fetching blog data for edit", err);
      }
      finally{
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  const PublishBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("content", formData.content);

      if(imageFile){
        data.append("image", imageFile);
      }

      setFormData({ title: "", category: "", content: "" });
      setImageFile(null);

      await axios.put(`/api/admin/blog/${params.id}`, data);
      toast.success("blog published successfully");

      console.log("Blog published successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.log("error in publishing blog", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow text-black">
      <h1 className="text-2xl font-semibold mb-6">Update Blog</h1>

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
          <option value="Politics">Politics</option>
          <option value="Tech">Tech</option>
          <option value="Business">Business</option>
          <option value="Sports">Sports</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Science">Science</option>
          <option value="World">World</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Economy">Economy</option>
          <option value="Social">Social</option>
        </select>

        {existingImage && (
          <img
            src={existingImage}
            alt="Existing news image"
            className="h-40 w-50 object-cover rounded-lg"
          />
        )}
        {/* Image Upload */}
        <div className="flex border rounded-lg">
          <Upload className="my-2 ml-2" />
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border-none "
            onChange={handleImageChange}
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
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}
