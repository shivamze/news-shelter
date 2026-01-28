import { sendEmail } from "../helpers/mailer";
import User from "@/src/models/userModel"
import crypto from "crypto";

export class EmailService {
    static async sendResetPasswordEmail(userId: string, email: string){
        const rawToken = crypto.randomBytes(32).toString("hex")
        const hashedToken = crypto
            .createHash("sha256")
            .update(rawToken)
            .digest("hex");
        
        await User.findByIdAndUpdate(userId, {
            resetToken: hashedToken,
            resetTokenExpiry: Date.now() + 3600000,
        })

        const html = `<p>Click <a href="${process.env.DOMAIN}/reset-password?token=${rawToken}">here</a> to reset your password</p>`;

        await sendEmail({to: email, subject: "Password Reset", html})

        return rawToken;
    }

    static async sendContactMessage(data: {
        name: string;
        email: string;
        profession: string;
        message: string;
    }){
        const html = `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Profession:</strong> ${data.profession}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message}</p>
        `;

        await sendEmail({
          to: process.env.MAIL_FROM!,
          subject: "New contact Form submission",
          html,
          replyTo: data.email,
        });
    }
}