import { NextResponse, NextRequest } from "next/server";
import Blog from "@/src/models/blogModel";
import { dbConnect } from "@/src/dbConfig/dbConfig";
import { requireAdmin } from "@/src/helpers/adminGuard";
import { generateUniqueNewsSlug } from "@/src/helpers/slugService";
import mongoose from "mongoose";
import { uploadOnCloudinary, deleteFromCloudinary } from "@/src/helpers/cloudinaryHelper";

import { updateBlogSchema } from "@/src/validators/blog.schema";

export async function GET(request:NextRequest, {params}: {params: {id: string}}){
    try{
        // connect db
        await dbConnect();

        // vaidate admin
        const admin = requireAdmin(request);
        if (admin instanceof NextResponse) return admin;

        // validate id
        if(!mongoose.Types.ObjectId.isValid(params.id)){
            return NextResponse.json({message: "invalid blog ID"}, {status: 400})
        }

        // find blog by id
        const blog = await Blog.findById(params.id)
            .select("title slug category content imageUrl profileImage author profession publishedAt").lean();
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        // return
        return NextResponse.json({
            message: "Blog retrieved successfully",
            data: blog,
            success: true,
        }, {status: 200})
    }catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

export async function PUT(request: NextRequest, {params}: {params: {id: string}}){
    try{
        // connect db
        await dbConnect();

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
          return NextResponse.json(
            { message: "Invalid blog ID" },
            { status: 400 }
          );
        }


        // admin check
        const admin = requireAdmin(request)
        if(admin instanceof NextResponse) return admin;

        // // data
        // const newData = await request.json();
        // const {title, content, category} = newData;

        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());

        const {title, content, category} = data as any;
        const file = formData.get("image") as File;

        const parsed = updateBlogSchema.safeParse({
          title,
          content,
          category,
        });

        if (!parsed.success) {
          return NextResponse.json(
            {
              message: "Validation error",
              errors: parsed.error.flatten().fieldErrors,
            },
            { status: 400 },
          );
        }

        // validate
        if(!title || !content || !category){
            return NextResponse.json({message: "all fields are required"}, {status: 400})
        }


        // existing user
        const existingBlog = await Blog.findById(params.id)

        if(!existingBlog){
            return NextResponse.json({message: "blog not found"}, {status: 404})
        }

        let imageUrl = existingBlog.imageUrl;
        let imagePublicId = existingBlog.imagePublicId;

        if(file){
            if(existingBlog.imagePublicId){
                const deleteImage = await deleteFromCloudinary(existingBlog.imagePublicId);
                if(!deleteImage){
                    return NextResponse.json({message: "image deletion failed in cloudinary"}, {status: 500})
                }
            }

            const uploadedImage =  await uploadOnCloudinary(file);
            if(uploadedImage){
                imageUrl = uploadedImage.secure_url;
                imagePublicId = uploadedImage.public_id;
            }else{
                return NextResponse.json({message: "upload failed in cloudinary"})
            }
        }

        // update slug based on title (normalize whitespace/case)
        let slug = existingBlog.slug;

        if (title?.trim() !== existingBlog.title?.trim()) {
            slug = await generateUniqueNewsSlug(title);
        }
        // update
        const updatedBlog = await Blog.findByIdAndUpdate(params.id, {
            title,
            slug,
            content,
            imageUrl,
            imagePublicId,
            category,
        }, {new: true})

        // return
        return NextResponse.json({
            message: "Blog updated successfully",
            data: updatedBlog,
            success: true,
        }, {status: 200})

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

// export async function PATCH(request: NextRequest, {params}: {params: {id: string}}){
//     try{

//         await dbConnect();



//     } catch(err: any){
//         return NextResponse.json({error: err.message}, {status: 500})
//     }
// }

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}){
    try{
        await dbConnect();

        const admin = requireAdmin(request);
        if (admin instanceof NextResponse) return admin;

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
          return NextResponse.json(
            { message: "invalid blog ID" },
            { status: 400 }
          );
        }

        const blog = await Blog.findById(params.id);

        if(!blog){
            return NextResponse.json(
              { message: "Blog not found" },
              { status: 404 }
            );
        }

        if(blog.imagePublicId){
            const deleteImage = await deleteFromCloudinary(blog.imagePublicId);
            if(!deleteImage){
                return NextResponse.json({message: "image deletion failed in cloudinary"}, {status: 500})
            }
        }


        const deleteBlog = await Blog.findByIdAndDelete(params.id);


        return NextResponse.json({
            message: "Blog deleted successfully",
            data: deleteBlog,
            success: true,
        }, {status: 200})

    }catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}