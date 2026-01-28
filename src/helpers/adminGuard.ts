import { NextResponse, NextRequest } from "next/server";
import { getAuthUser } from "./auth";

export function requireAdmin(request: NextRequest){
    const user = getAuthUser(request)

    if(!user){
        return NextResponse.json({
            message: "Authentication required"
        }, {status: 401})
    }

    if(user.role !== "admin"){
        return NextResponse.json({
            message: "Admin only access"
        }, {status: 403})
    }

    return user;
}