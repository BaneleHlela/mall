import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
    createSearchPost,
    getSearchPost,
    editSearchPost,
    deleteSearchPost,
    fetchSearchPosts,
    updateSearchPostStats
} from "../controllers/SearchPostController.js";

const router = express.Router();

// Create a new search post
router.post("/", protectRoute, createSearchPost);

// Fetch all active search posts
router.get("/", fetchSearchPosts);

// Get search post by ID
router.get("/:id", getSearchPost);

// Edit search post
router.put("/:id", protectRoute, editSearchPost);

// Delete search post
router.delete("/:id", protectRoute, deleteSearchPost);

// Update search post stats
router.patch("/stats/:searchPostId", updateSearchPostStats);

export default router;