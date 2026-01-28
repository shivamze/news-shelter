import { NextResponse, NextRequest } from "next/server";
import News from "@/src/models/newsModel";
import { dbConnect } from "@/src/dbConfig/dbConfig";
import { requireAdmin } from "@/src/helpers/adminGuard";
import { generateUniqueNewsSlug } from "@/src/helpers/slugService";
import { uploadOnCloudinary, deleteFromCloudinary } from "@/src/helpers/cloudinaryHelper";
import { updateNewsSchema } from "@/src/validators/news.schema";

export async function GET(request: NextRequest, {params}: any){
    try{

        await dbConnect();
        const admin = requireAdmin(request);
        if(admin instanceof NextResponse) return admin;

        const news = await News.findById(params.id);
        if(!news){
            return NextResponse.json({message: "News article not found"}, {status: 404});
        }

        return NextResponse.json({
            message: "News article retrieved successfully",
            data: news,
            success: true
        }, {status: 200});

    }catch (err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

export async function PUT(request: NextRequest, {params}: any){
    try{
        // connect db
        await dbConnect();
        // retrieve auth user and verify admin
        const admin = requireAdmin(request);
        if(admin instanceof NextResponse) return admin;

        // retrieve news data from request
        // const newsData = await req.json();
        // const {title, content, imageUrl, category} = newsData

        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());

        const { title, content, category } = data as any;
        const file = formData.get("image") as File;

        // validate data
        const parsed = updateNewsSchema.safeParse({
          title,
          content,
          category,
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
            { message: "Title, content and category are required" },
            { status: 400 }
          );
        }
        
        
        const existingNews = await News.findById(params.id);
        
        if(!existingNews){
          return NextResponse.json({message: "news article not found"}, {status: 404});
        }

        let imageUrl = existingNews.imageUrl;
        let imagePublicId = existingNews.imagePublicId;

        if (file) {
          if (existingNews.imagePublicId) {
            const deleteImage = await deleteFromCloudinary(existingNews.imagePublicId);
            if(!deleteImage){
              return NextResponse.json({message: "image deletion failed in cloudinary"}, {status: 500})
            }
          }
          const uploadedImage = await uploadOnCloudinary(file);
          if (uploadedImage) {
            imageUrl = uploadedImage.secure_url;
            imagePublicId = uploadedImage.public_id;
          }
        }

        let slug = existingNews.slug;

        if(title !== existingNews.title){
            slug = await generateUniqueNewsSlug(title)
        }



        // find and update news item
        const updatedNews = await News.findByIdAndUpdate(
          params.id,
          {
            title,
            slug,
            content,
            imageUrl,
            imagePublicId,
            category,
          },
          { new: true }
        );

        // return response
        return NextResponse.json({
            message: "News article updated successfully",
            data: updatedNews,
            success: true
        }, {status: 200
        })

    }catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

export async function PATCH(req: NextRequest, {params}: any){
    try{
      // connect db
      await dbConnect();

      // retrieve auth user and verify admin
      const admin = requireAdmin(req);
      if (admin instanceof NextResponse) return admin;

      // retrieve news data from request
      const newsData = await req.json();
      const { status } = newsData;

      const allowedStatus = ["draft", "published", "archived"];

      if (!allowedStatus.includes(status)) {
        return NextResponse.json(
          { message: "Status is required" },
          { status: 400 }
        );
      }
      // find and update news item
      const updatedNews = await News.findByIdAndUpdate(
        params.id,
        {
          status,
        },
        { new: true }
      );

      if (!updatedNews) {
        return NextResponse.json(
          { message: "News article not found" },
          { status: 404 }
        );
      }

      // return response
      return NextResponse.json(
        {
          message: "News article status updated successfully",
          data: updatedNews,
          success: true,
        },
        { status: 200 }
      );
    } catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

export async function DELETE(req: NextRequest, {params}: any){
    try{
        // connect db
        await dbConnect()

        // retrieve auth user and verify admin
        const admin = requireAdmin(req);
        if(admin instanceof NextResponse) return admin;

        const news = await News.findById(params.id)

        if(!news){
          return NextResponse.json({message: "News article not found"}, {status: 404})
        }

        if(news.imagePublicId){
          
          const deleteImage = await deleteFromCloudinary(news.imagePublicId);
          if(!deleteImage){
            return NextResponse.json({message: "Image deletion from cloudinary failed"}, {status: 500})
          }
        }



        // find and delete news item
        await News.findByIdAndDelete(params.id);
        
        // return response
        return NextResponse.json({
            message: "News article deleted successfully",
            success: true
        }, {status: 200
        })

    }catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}