import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { dbConnect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";

export async function GET() {
  try {
    await dbConnect();

    const accessToken = cookies().get("token")?.value;

    // ✅ No token
    if (!accessToken) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // ✅ Verify token
    const decoded: any = jwt.verify(accessToken, process.env.SECRET_TOKEN!);

    // 🔥 IMPORTANT: match payload key
    const userId = decoded.userId || decoded.id;

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 401 }
      );
    }

    // ✅ Fetch minimal data
    const user = await User.findById(userId).select("role fullname email");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    // ✅ SUCCESS
    return NextResponse.json({
      authenticated: true,
      role: user.role,
      fullName: user.fullname,
      email: user.email,
    });
  } catch (error) {
    return NextResponse.json({ message: "Session expired" }, { status: 401 });
  }
}
