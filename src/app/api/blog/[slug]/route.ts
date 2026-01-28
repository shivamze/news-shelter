import { dbConnect } from "@/src/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import Blog from "@/src/models/blogModel";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    await dbConnect();

    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { message: "slug is required" },
        { status: 400 },
      );
    }

    const blog = await Blog.findOne({
      slug,
    })
      .select(
        "title slug content imageUrl category author profileImage publishedAt profession",
      )
      .lean();

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        data: blog,
        success: true,
      },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
