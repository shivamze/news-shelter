import Link from "next/link";

type Blogs = {
  title: string;
  imageUrl: string;
  slug: string;
  category: string;
  author: string;
  profileImage: string,
  publishedAt: Date;
};

export default function NewsCard({ post }: { post: Blogs }) {
  return (
    <Link href={`blogs/${post.slug}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={post.profileImage}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm">{post.author}</p>
              <time className="text-xs text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs mb-3 bg-blue-500`}
          >
            {post.category}
          </span>
          <h3 className="mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 font-black">
            {post.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
