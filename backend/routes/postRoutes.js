import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
    getPost,
    togglePostLike,
    createPostReview,
    getPostReviews,
    getPostStats,
    deletePostReview
} from "../controllers/PostController.js";

const router = express.Router();

// Get post by identifier
router.get("/:identifier", getPost);

// Get post stats (likes & rating)
router.get("/:identifier/stats", getPostStats);

// Toggle like on post
router.post("/:identifier/like", protectRoute, togglePostLike);

// Get reviews for a post
router.get("/:identifier/reviews", getPostReviews);

// Create a review for a post
router.post("/:identifier/reviews", protectRoute, createPostReview);

// Delete a review
router.delete("/reviews/:reviewId", protectRoute, deletePostReview);

export default router;
