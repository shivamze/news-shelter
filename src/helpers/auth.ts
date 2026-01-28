import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface AuthUser{
    userId: string;
    role: "admin" | "user";
}

export function getAuthUser(request: NextRequest): AuthUser | null{
    try{
        const authHeader = request.headers.get("authorization");
        let token = authHeader?.startsWith("Bearer ")
          ? authHeader.split(" ")[1]
          : null;

        // 2️⃣ Fallback to cookie
        if (!token) {
          token = request.cookies.get("token")?.value || null;
        }
        if(!token) return null;

        const decoded = jwt.verify(token, process.env.SECRET_TOKEN!) as AuthUser

        return decoded;
    }catch{
        return null
    }
}