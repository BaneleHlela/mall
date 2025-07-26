import Review from "../models/ReviewModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { updateStoreRating, initializeAllStoreRatings } from "../utils/updateStoreRating.js";

export const createReview = asyncHandler(async (req, res) => {
    const { store, rating, comment, anonymous = false } = req.body;

    const userId = req.user._id.toString();
    const allowDuplicateUserId = "688381b107d49d5bdda34f8b";

    let review;

    if (userId === allowDuplicateUserId) {
      // Allow duplicate reviews for this specific user ID
      review = new Review({
        user: req.user._id,
        store,
        rating,
        comment,
        anonymous,
      });
    } else {
    // Check if a review already exists for the user and store
    review = await Review.findOne({
      user: req.user._id,
      store,
    });

    if (review) {
      // Update existing review
      review.rating = rating;
      review.comment = comment;
      review.anonymous = anonymous;
      review.updatedAt = Date.now();
    } else {
      // Create new review
      review = new Review({
          user: req.user._id,
          store,
          rating,
          comment,
          anonymous,
        });
      }
    }

  const savedReview = await review.save();

  // Update store rating after review is saved
  try {
    await updateStoreRating(store);
  } catch (error) {
    console.error("Error updating store rating:", error);
    // Don't fail the request if rating update fails
  }

  res.status(201).json(savedReview);
});
  

// GET store reviews
export const getStoreReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ store: req.params.storeId })
    .populate('user', 'firstName lastName') // Populate both firstName and lastName
    .sort({ createdAt: -1 });

  res.json(reviews);
});

// GET review by Id
export const getReviewById = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
  
    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }
  
    res.json(review);
});

// Update review
export const updateReview = asyncHandler(async (req, res) => {
    
    const review = await Review.findById(req.params.id);
  
    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }
  
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to update this review");
    }
  
    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
  
    const updatedReview = await review.save();

    // Update store rating after review is updated
    try {
      await updateStoreRating(review.store);
    } catch (error) {
      console.error("Error updating store rating:", error);
      // Don't fail the request if rating update fails
    }

    res.json(updatedReview);
});

/// Delete review
export const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
  
    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }
  
    if (
      review.user.toString() !== req.user._id.toString() 
      // &&!req.user.isAdmin
    ) {
      res.status(403);
      throw new Error("Not authorized to delete this review");
    }

    // Store the store ID before deleting the review
    const storeId = review.store;
    
    await review.deleteOne();

    // Update store rating after review is deleted
    try {
      await updateStoreRating(storeId);
    } catch (error) {
      console.error("Error updating store rating:", error);
      // Don't fail the request if rating update fails
    }

    res.json({ message: "Review removed" });
});


export const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({})
      .populate('user', 'name')
      .populate('store', 'name');
  
    res.json(reviews);
});


export const getStoreRatingStats = asyncHandler(async (req, res) => {
  const { storeId } = req.params;
  
  // Aggregate ratings and count
  const stats = await Review.aggregate([
    { $match: { store: new mongoose.Types.ObjectId(storeId) } }, // Ensure storeId is an ObjectId
    {
      $group: {
        _id: null, // Group all reviews together
        averageRating: { $avg: "$rating" }, // Calculate average rating
        numberOfRatings: { $sum: 1 }, // Count total number of ratings
      },
    },
  ]);


  if (!stats || stats.length === 0) {
    res.status(404);
    throw new Error("No reviews found for this store.");
  }

  res.json({
    averageRating: stats[0].averageRating.toFixed(2), // Format average rating to 2 decimal places
    numberOfRatings: stats[0].numberOfRatings,
  });
});

// Initialize ratings for all stores (migration endpoint)
export const initializeStoreRatings = asyncHandler(async (req, res) => {
try {
  const updatedCount = await initializeAllStoreRatings();
  res.json({
    message: `Successfully initialized ratings for ${updatedCount} stores`,
    updatedCount
  });
} catch (error) {
  res.status(500);
  throw new Error("Failed to initialize store ratings");
}
});