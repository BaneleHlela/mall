import Post from "../models/PostModel.js";
import PostReview from "../models/PostReviewModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { generateSlug } from "../utils/helperFunctions.js";
import crypto from "crypto";

// Generate a unique post identifier
const generateUniqueIdentifier = async (title) => {
    const baseSlug = title ? generateSlug(title) : "post";
    let identifier = baseSlug;
    let counter = 0;
    
    while (await Post.findOne({ identifier })) {
        counter++;
        identifier = `${baseSlug}-${crypto.randomBytes(2).toString('hex')}`;
    }
    
    return identifier;
};

// Create a new post
export const createPost = asyncHandler(async (req, res) => {
    const { title } = req.body;
    
    const identifier = await generateUniqueIdentifier(title || "");
    
    const post = new Post({
        identifier,
        title,
        likes: {
            count: 0,
            users: []
        },
        rating: {
            averageRating: 0,
            numberOfRatings: 0
        }
    });
    
    await post.save();
    res.status(201).json(post);
});

// Get post by identifier
export const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ identifier: req.params.identifier });
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }
    res.json(post);
});

// Toggle like on post
export const togglePostLike = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ identifier: req.params.identifier });
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }
    
    const userId = req.user._id;
    const hasLiked = post.likes.users.some(u => u.toString() === userId.toString());
    
    if (hasLiked) {
        post.likes.users = post.likes.users.filter(u => u.toString() !== userId.toString());
        post.likes.count = Math.max(0, post.likes.count - 1);
    } else {
        post.likes.users.push(userId);
        post.likes.count += 1;
    }
    
    await post.save();
    res.json(post);
});

// Get post reviews
export const getPostReviews = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ identifier: req.params.identifier });
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }
    
    const reviews = await PostReview.find({ post: post._id })
        .populate('user', 'firstName lastName username avatar')
        .sort({ createdAt: -1 });
    
    res.json(reviews);
});

// Create post review
export const createPostReview = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ identifier: req.params.identifier });
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }
    
    const { rating, comment, anonymous = false } = req.body;
    
    // Check for existing review from user
    let review = await PostReview.findOne({
        post: post._id,
        user: req.user._id
    });
    
    if (review) {
        review.rating = rating;
        review.comment = comment;
        review.anonymous = anonymous;
    } else {
        review = new PostReview({
            post: post._id,
            user: req.user._id,
            rating,
            comment,
            anonymous
        });
    }
    
    await review.save();
    
    // Update post rating stats
    const stats = await PostReview.aggregate([
        { $match: { post: post._id } },
        { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);
    
    if (stats.length > 0) {
        post.rating.averageRating = Math.round(stats[0].avg * 100) / 100;
        post.rating.numberOfRatings = stats[0].count;
        await post.save();
    }
    
    // Populate user before returning
    await review.populate('user', 'firstName lastName username avatar');
    
    // Return review with post rating info
    res.json({
        ...review.toObject(),
        post: {
            rating: post.rating
        }
    });
});

// Get post stats (likes & rating)
export const getPostStats = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ identifier: req.params.identifier });
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }
    res.json({
        likes: post.likes,
        rating: post.rating
    });
});

// Delete post review
export const deletePostReview = asyncHandler(async (req, res) => {
    const review = await PostReview.findById(req.params.reviewId);
    
    if (!review) {
        res.status(404);
        throw new Error("Review not found");
    }
    
    if (review.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Not authorized to delete this review");
    }
    
    const post = await Post.findById(review.post);
    
    await review.deleteOne();
    
    // Update post rating stats
    if (post) {
        const stats = await PostReview.aggregate([
            { $match: { post: post._id } },
            { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } }
        ]);
        
        if (stats.length > 0) {
            post.rating.averageRating = Math.round(stats[0].avg * 100) / 100;
            post.rating.numberOfRatings = stats[0].count;
        } else {
            post.rating.averageRating = 0;
            post.rating.numberOfRatings = 0;
        }
        await post.save();
    }
    
    res.json({ message: "Review removed" });
});
