import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "Please provide a user ID"],
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide a post ID"],
    },

})

const Bookmark = mongoose.models.bookmarks || mongoose.model('bookmarks', bookmarkSchema)

export default Bookmark;