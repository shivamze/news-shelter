import Link from "next/link";

type News = {
  title: string;
  imageUrl: string;
  slug: string;
  category: string;
  publishedAt: Date;
}

export default function NewsCard({article}: {article: News}){



  return (
    <Link href={`news/${article.slug}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="aspect-video overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs bg-blue-500">
              {article.category}
            </span>
            <time className="text-xs text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <h3 className="mb-2 group-hover:text-blue-600 transition-colors text-black font-bold line-clamp-2">
            {article.title}
          </h3>
          {/* <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {article.description}
          </p> */}
        </div>
      </div>
    </Link>
  );
}