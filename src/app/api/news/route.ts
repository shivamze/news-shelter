import News from "@/src/models/newsModel";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/src/dbConfig/dbConfig"; 
export async function GET(request: NextRequest) { 
  try{ 
    await dbConnect(); 
    const {searchParams} = new URL(request.url) 
    const page = Number(searchParams.get("page")) ||1; 
    const limit = Number(searchParams.get("limit")) || 6; 
    const skip = (page-1) * limit; 
    const news = await News.find({status: "published"}) 
      .sort({publishedAt: -1}) 
      .skip(skip) .limit(limit) 
      .select("title slug imageUrl category publishedAt status") 
      .lean(); 
    const totalNews = await News.countDocuments({status: "published"}); 

    const hasMore = skip + news.length < totalNews;

    return NextResponse.json({ 
      data: news, 
      pagination: { 
        page, 
        limit, 
        hasMore, 
      }, 
      success: true, 
    }, {status: 200}) 
  } catch(err: any){ 
    return NextResponse.json({error: err.message}, {status: 500})
  }
}