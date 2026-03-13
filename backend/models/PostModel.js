import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
    },
    likes: {
        count: {
            type: Number,
            default: 0,
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    rating: {
        averageRating: {
            type: Number,
            default: 0,
        },
        numberOfRatings: {
            type: Number,
            default: 0,
        }
    }
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

export default Post;
