import { dbConnect } from "@/src/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/src/models/userModel";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/src/validators/auth.schema";

// export const runtime = "nodejs"


export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const reqBody = await request.json();

    console.log("Received signup data:", reqBody);

    const parsed = signupSchema.safeParse(reqBody);
    console.log("Validation result:", parsed);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { fullname, email, password } = reqBody;

    if ( !fullname || !email || !password) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return NextResponse.json(
        { message: "User already exists. Please login." },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
