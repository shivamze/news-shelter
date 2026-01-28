"use client"
import Image from "next/image";
import  FeaturedCarousel  from "@/src/app/components/home/NewsCarousel"
import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard  from "./components/home/NewsCard";
import { ChevronRight } from "lucide-react";

export default function Home() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false)


  
  const fetchNews = async(pageNumber: number) =>{
    try{
      setLoading(true);

      const res = await axios.get("/api/news", {
        params: {
          page: pageNumber,
          limit: 6,
        }
      });

      const {data, pagination} = res.data;

      setNewsList((prev) => pageNumber === 1? data: [...prev, ...data])

      setHasMore(pagination.hasMore)

      console.log("data fetched successfully: ",  res.data.data);

    }catch(err){
      console.log("backend data retrieval failed")
      return err;
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(1);
  }, [])
  

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Featured Carousel */}
        <section className="mb-8 md:mb-12">
          <FeaturedCarousel articles={newsList.slice(0,5)} />
        </section>

        {/* Latest News Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl text-gray-900 mb-1">
                Latest News
              </h2>
              <p className="text-sm text-gray-600">
                Stay updated with the most recent developments
              </p>
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {newsList.map((article) => (
              <NewsCard key={article._id} article={article} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center">
              <button
                disabled={loading}
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {loading ? "Loading..." : "Load More Articles"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>

    // <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    //   {/* <Header/> */}
    //   <main className="flex min-h-screen w-full flex-col items-center justify-between py-1 px-1 bg-white dark:bg-black sm:items-start">
    //     <FeaturedCarousel articles={newsList}/>

    //     <div className="flex items-center justify-between mb-6">
    //       <div>
    //         <h2 className="text-2xl md:text-3xl text-gray-900 mb-1">
    //           Latest News
    //         </h2>
    //         <p className="text-sm text-gray-600">
    //           Stay updated with the most recent developments
    //         </p>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    //       {newsList.map((news: any) => (
    //         <NewsCard key={news._id} article={news} />
    //       ))}
    //     </div>
    //   </main>
    //   {/* <Footer/> */}
    // </div>
  );
}
