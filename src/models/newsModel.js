import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for the news article"],
        trim: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    slug:{
        type: String,
        required: [true, "Please provide a slug for the news article"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    content: {
        type: String,
        required: [true, "Please provide content for the news article"],
    },
    category: {
        type: String,
        enum: ['politics', 'sports', 'tech','entertainment', 'business', 'health', 'science', 'world', 'infra', 'economy', 'social'],
        default: 'social',
        lowercase: true,
        trim: true,
        index: true,
    },
    imageUrl: {
        type: String,
    },
    imagePublicId: {type: String},

    source: {
        type: String,
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published'
    },
    publishedAt: Date,
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: [true, "Please provide an author for the news article"],
    // },
}, { timestamps: true })

const News = mongoose.models.news || mongoose.model('news', newsSchema)

export default News;