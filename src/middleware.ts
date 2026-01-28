import { NextResponse, NextRequest } from "next/server";
import {jwtVerify} from "jose"

const secret = new TextEncoder().encode(process.env.SECRET_TOKEN!);

export async function middleware(request: NextRequest){
    const token = request.cookies.get("token")?.value;

    if(!token){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try{
        const { payload } = await jwtVerify(token, secret);

        if(payload.role !== "admin"){
            return NextResponse.redirect(new URL("/unauthorized", request.url))
        }

        return NextResponse.next();
    }catch(err){
        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
    matcher: ["/admin/:path*"]
}
 