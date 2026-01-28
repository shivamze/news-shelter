import News from "@/src/models/newsModel";
import { dbConnect } from "@/src/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await dbConnect();

        const totalViews = await News.aggregate([
            {
                $group: {
                    _id: null,
                    totalViews: {$sum: "$views"}
                }
            }
        ])

        return NextResponse.json({
            success: true,
            totalViews: totalViews[0]?.totalViews || 0
        }, {status: 200});
    }catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500});
    }
}