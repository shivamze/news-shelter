import nodemailer from 'nodemailer'

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
}

export const sendEmail = async ({to, subject, html, replyTo}: EmailOptions) => {
    try{

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            }
        })

        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to,
            subject,
            html,
            replyTo,
        })
        console.log('Email sent successfully')
    }catch(err: any){
        throw new Error(err.message)
    }
}