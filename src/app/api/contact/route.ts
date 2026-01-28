import { NextResponse, NextRequest } from "next/server";
import Contact from "@/src/models/contactModel"
import { dbConnect } from "@/src/dbConfig/dbConfig";
import { EmailService } from "@/src/services/emailServices";

export async function POST(request: NextRequest){
    try{
        await dbConnect()

        const body = await request.json();
        const {name, email, profession, message} = body;

        if(!name || !email || !profession || !message){
            return NextResponse.json({message: "All fields are required"}, {status: 400})
        }

        const newContact = new Contact({name, email, profession, message});

        await newContact.save();

        await EmailService.sendContactMessage({
            name,
            email,
            profession,
            message
        });

        return NextResponse.json({
            message: "Message sent successfully",
            success: true,
        }, {status: 200})

    } catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}