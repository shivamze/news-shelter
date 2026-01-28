import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    fullname: {
        type: String,
        required: [true, "Please provide your full name"],
        trim: true,
        index: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    refreshToken: String,
    refreshTokenExpiry: Date,
    resetToken: String,
    resetTokenExpiry: Date,
}, { timestamps: true})

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User;