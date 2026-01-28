import { dbConnect } from "@/src/dbConfig/dbConfig";
import  News from "@/src/models/newsModel"
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest,{params}: {params: {slug: string}}){
    try{
        await dbConnect();

        const { slug } = params;

        if (!slug) {
           return NextResponse.json(
             { message: "slug is required" },
             { status: 400 },
           );
        }

        const news = await News.findOneAndUpdate(
          { slug },
          { $inc: { views: 1 } }, // 🔥 atomic increment
          { new: true },
        );

        if (!news) {
          return NextResponse.json(
            { message: "News not found" },
            { status: 404 },
          );
        }

        return NextResponse.json({ views: news.views }, { status: 200 });


    }catch(err: any){
        return NextResponse.json({
            error: "Failed to update view count"
        },
        {status: 500})
    }

}