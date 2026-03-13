import mongoose from 'mongoose';

const PostReviewSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    anonymous: {
        type: Boolean, 
        default: false
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: false,
        default: "",
    },
}, { timestamps: true });


const PostReview = mongoose.model('PostReview', PostReviewSchema);
export default PostReview;
