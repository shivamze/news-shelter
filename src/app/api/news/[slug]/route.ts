import News from "@/src/models/newsModel";
import { dbConnect } from "@/src/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: {slug: string}}){
    try{
        await dbConnect();

        const {slug} = params;

        if(!slug){
            return NextResponse.json({message: "slug is required"}, {status: 400})
        }

        const news = await News.findOne({
            slug,
            status: "published",
        }).select(
                "title slug content imageUrl category source publishedAt views"
            ).lean();
        
        if(!news){
            return NextResponse.json({
                message: "News article not found"
            }, {status: 404})
        }

        return NextResponse.json(
            {
                data: news,
                success: true,
            },
            {status: 200}
        )
    } catch(err: any){
        return NextResponse.json(
            {error: err.message},
            {status: 500}
        )
    }

}