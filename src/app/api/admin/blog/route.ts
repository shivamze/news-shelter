import Blog from "@/src/models/blogModel"
import { dbConnect } from "@/src/dbConfig/dbConfig"
import { NextResponse, NextRequest } from "next/server"
import { generateUniqueNewsSlug } from "@/src/helpers/slugService"
import { requireAdmin } from "@/src/helpers/adminGuard";
import { uploadOnCloudinary } from "@/src/helpers/cloudinaryHelper";
import { createBlogSchema } from "@/src/validators/blog.schema";

export async function POST(request: NextRequest){
    try{
        //connect db
        await dbConnect();
        // check admin
        const admin = requireAdmin(request)
        if(admin instanceof NextResponse) return admin;

        //  retrieve data from req
        // const body = await request.json();
        // const { title, content, category, imageUrl  , author, profession, profileImage} = body;

        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());

        const {
          title,
          content,
          category,
          author,
          profession,
        } = data as any;

        console.log(data);
        

        const parsed = createBlogSchema.safeParse({
          title,
          content,
          category,
          author,
          profession,
        });



        if(!parsed.success){
          return NextResponse.json({
            message: "Validation error",
            errors: parsed.error.flatten().fieldErrors
          }, {status: 400
          })
        }


        // validate required fields
        if (!title || !content || !category || !author) {
          return NextResponse.json(
            {
              message:
                "Title, content, category, and author are required fields",
            },
            { status: 400 }
          );
        }

        const blogFile = formData.get("blogImage") as File 
        const profileFile = formData.get("profileImage") as File;

        const uploadedBlog = await uploadOnCloudinary(blogFile);
        if(!uploadedBlog){
          return NextResponse.json({message: "image upload failed"}, {status: 500})
        }

        const uploadedProfile = await uploadOnCloudinary(profileFile);
        if(!uploadedProfile){
          return NextResponse.json({message:" failed to upload profile image"}, {status: 500})
        }
        //  generate unique slug
        const slug = await generateUniqueNewsSlug(title);

        // create and save blog
        const newBlog = new Blog({
          title,
          slug,
          content,
          category,
          imageUrl: uploadedBlog.secure_url,
          imagePublicId: uploadedBlog.public_id,
          profileImage: uploadedProfile.secure_url,
          profileImagePublicId: uploadedProfile.public_id,
          author,
          profession,
          publishedAt: new Date(),
        });

        await newBlog.save();
        
        // return
        return NextResponse.json(
          {
            message: "Blog created successfully",
            data: newBlog,
            success: true,
          },
          { status: 201 }
        );

    }catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}