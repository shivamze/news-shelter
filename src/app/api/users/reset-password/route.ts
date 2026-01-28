import { NextResponse, NextRequest } from "next/server";
import User from "@/src/models/userModel";
import bcryptjs from "bcryptjs";
import { dbConnect } from "@/src/dbConfig/dbConfig";
import crypto from "crypto";
import { resetPasswordSchema } from "@/src/validators/auth.schema";

export async function POST(request: NextRequest){
    try{
        await dbConnect();

        const reqBody = await request.json()

        const parsed = resetPasswordSchema.safeParse(reqBody);

        if (!parsed.success) {
          return NextResponse.json(
            { errors: parsed.error.flatten().fieldErrors },
            { status: 400 },
          );
        }

        const {token, password} = reqBody

        if(!token || !password){
            return NextResponse.json({message: "enter your token and password"}, {status: 400});
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        
        // const user = await User.findOne({resetToken: hashedToken, resetTokenExpiry: {$gt: Date.now()}})

        // if(!user){
        //     return NextResponse.json({message: "Invalid or expired token"}, {status: 400});
        // }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const updatedUser = await User.findOneAndUpdate(
          { resetToken: hashedToken, resetTokenExpiry: { $gt: Date.now() } },
          {
            password: hashedPassword,
            resetToken: undefined,
            resetTokenExpiry: undefined,
          },
          { new: true } // return updated document
        );

        if (!updatedUser) {
          return NextResponse.json(
            { message: "Invalid or expired token" },
            { status: 400 }
          );
        }
        return NextResponse.json({
            message: "password reset successful",
            success: true
        }, {status: 200})


    }catch(err: any){
        return NextResponse.json({message: err.message}, {status: 500});
    }
}