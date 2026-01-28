import mongoose from "mongoose";
import { type } from "os";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the blog post"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Please provide a slug for the blog post"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, "Please provide content for the blog post"],
    },
    category: {
      type: String,
      enum: [
        "politics",
        "sports",
        "technology",
        "entertainment",
        "business",
        "health",
        "science",
        "world",
        "infra",
        "economy",
        "social",
      ],
      default: "social",
      lowercase: true,
      trim: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide an image URL for the blog post"],
    },
    imagePublicId: {type: String},
    author: {
      type: String,
      required: [true, "Please provide the author's name"],
      trim: true,
      index: true,
    },
    profession: {
      type: String,
      required: [true, "Please provide the author's profession"],
      lowercase: true,
      trim: true,
      index: true,
    },
    profileImage: {
      type: String,
      required: [true, "Please provide the author's profile image"],
    },
    profileImagePublicId: {type: String},

    publishedAt: {
      type: Date,
    }
  },
  { timestamps: true } 
);

const Blog = mongoose.models.blogs || mongoose.model('blogs', blogSchema)

export default Blog