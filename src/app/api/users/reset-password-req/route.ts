import { NextResponse, NextRequest } from "next/server";
import User from "@/src/models/userModel";
import { EmailService } from "@/src/services/emailServices";
import { dbConnect } from "@/src/dbConfig/dbConfig";
import { resetPasswordRequestSchema } from "@/src/validators/auth.schema";

export async function POST(request: NextRequest){
    try{
        await dbConnect();
        const reqBody = await request.json();

        const parsed =resetPasswordRequestSchema.safeParse(reqBody);
        if(!parsed.success){
            return NextResponse.json(
              { errors: parsed.error.flatten().fieldErrors },
              { status: 400 },
            );
        }
        const {email} = reqBody

        if(!email){
            return NextResponse.json({message: "Email is required"}, {status: 400})
        }

        const user = await User.findOne({email});

        if(user){
            await EmailService.sendResetPasswordEmail(user._id, email);
        }

        return NextResponse.json({
            message: "If a user with that email exists, a password reset link has been sent.",
            success: true,
        }, {status: 200})

    } catch(err: any){
        return NextResponse.json({message: err.message}, {status: 500})
    }
}
