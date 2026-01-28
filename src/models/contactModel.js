import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        trim: true,
        lowercase: true,
    },
    profession: {
        type: String,
        required: [true, "Please provide your profession"],
        trim: true,
        lowercase: true,
    },
    message: {
        type: String,
        required: [true, "Please provide your message"],
    },
}, { timestamps: true })

const Contact = mongoose.models.contacts || mongoose.model('contacts', contactSchema)

export default Contact;