import Blog from "@/src/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/src/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const blog = await Blog.find()
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("title slug author imageUrl profileImage category publishedAt")
      .lean();

    const totalBlog = await Blog.countDocuments();

    const hasMore = skip + blog.length < totalBlog;

    return NextResponse.json(
      {
        data: blog,
        pagination: {
          page,
          limit,
          hasMore,
        },
        success: true,
      },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}