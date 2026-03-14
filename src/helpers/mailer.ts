import nodemailer from 'nodemailer'
// import {Resend} from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
}

export const sendEmail = async ({to, subject, html, replyTo}: EmailOptions) => {
    try{

        const transporter = nodemailer.createTransport({
            service: "gmail",
            // host: process.env.MAIL_HOST,
            // port: Number(process.env.MAIL_PORT),
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            }
        })

        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to,
            subject,
            html,
            replyTo,
        })

        // await resend.emails.send({
        //   from: process.env.MAIL_FROM!,
        //   to,
        //   subject,
        //   html,
        //   replyTo,
        // });

        console.log('Email sent successfully')
    }catch(err: any){
        throw new Error(err.message)
    }
}