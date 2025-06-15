import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { createReview, deleteReview, getAllReviews, getReviewById, getStoreReviews, updateReview } from "../controllers/ReviewController.js";

const router = express.Router();


router.post("/", protectRoute, createReview);
router.get("/store/:storeId", getStoreReviews);
router.get("/:id", getReviewById);
router.put("/:id", protectRoute, updateReview)
router.delete("/:id", protectRoute, deleteReview);
router.get("/", getAllReviews);

export default router;