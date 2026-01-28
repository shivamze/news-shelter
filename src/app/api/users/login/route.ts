import { dbConnect } from "@/src/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/src/validators/auth.schema";


export async function POST(request: NextRequest){
    try{
        await dbConnect();
        const reqBody = await request.json()

        const parsed = loginSchema.safeParse(reqBody);
        if(!parsed.success){
            return NextResponse.json({
                message: "Validation failed",
                errors: parsed.error.flatten().fieldErrors,
            }, {status: 400})
        }

        const {email, password} = reqBody;

        if(!email || !password){
            return NextResponse.json({error: "Please provide all required fields"}, {status: 400})
        }

        const normalizedEmail = email.toLowerCase().trim()
        const user = await User.findOne({email: normalizedEmail});

        if(!user){
            return NextResponse.json({error: "User Does not exist"}, {status: 404})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return NextResponse.json({error: "wrong password"}, {status: 401})
        }

        const tokenData = {
            id: user._id.toString(),
            role: user.role,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!,{expiresIn: "7d"});

        const response = NextResponse.json({
            message: "Login successful",
            data: tokenData,
            role: user.role,
            success: true
        })

        response.cookies.set("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}