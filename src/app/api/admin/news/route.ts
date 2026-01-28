import News from "@/src/models/newsModel";
import { dbConnect } from "@/src/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { generateUniqueNewsSlug } from "@/src/helpers/slugService";
import { requireAdmin } from "@/src/helpers/adminGuard";
import { uploadOnCloudinary } from "@/src/helpers/cloudinaryHelper";
import { createNewsSchema } from "@/src/validators/news.schema";
export async function POST(request: NextRequest) {
  try {
    // Connect to DB
    await dbConnect();

    // check user authorization
    const admin = requireAdmin(request);
    if (admin instanceof NextResponse) return admin;

    // retrieve news data from request
    // const body = await request.json();
    // const {title, content, category, imageUrl, source, author} = body;

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const { title, content, category, source } = data as any;
    const file = formData.get("image") as File;

    const parsed = createNewsSchema.safeParse({
      title,
      content,
      category,
      source,
    })
    
    if(!parsed.success){
      return NextResponse.json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors
      }, {
        status: 400
      })
    }

    // validate required fields
    if (!title || !content || !category) {
      return NextResponse.json(
        { message: "Title, content, category, and author are required fields" },
        { status: 400 },
      );
    }
    // cloudinary
    const uploadedImage = await uploadOnCloudinary(file);

    if (!uploadedImage) {
      return NextResponse.json(
        { message: "image upload failed" },
        { status: 500 },
      );
    }
    // generate unique slug
    const slug = await generateUniqueNewsSlug(title);

    // create and save news item
    const newNews = new News({
      title,
      slug,
      content,
      category,
      imageUrl: uploadedImage.secure_url,
      imagePublicId: uploadedImage.public_id,
      source,
      // author: admin.userId,
      status: "published",
      publishedAt: new Date(),
    });

    await newNews.save();

    return NextResponse.json(
      {
        message: "News article created successfully",
        data: newNews,
        success: true,
      },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
    const skip = (page - 1) * limit;
    const news = await News.find()
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("title slug imageUrl category publishedAt status")
      .lean();
    const totalNews = await News.countDocuments();

    const hasMore = skip + news.length < totalNews;

    return NextResponse.json(
      {
        data: news,
        pagination: {
          page,
          limit,
          hasMore,
        },
        totalNews,
        success: true,
      },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
