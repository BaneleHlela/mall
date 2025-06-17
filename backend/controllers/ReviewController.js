import Review from "../models/ReviewModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

export const createReview = asyncHandler(async (req, res) => {
    const { store, rating, comment, anonymous = false } = req.body;
  
    const existingReview = await Review.findOne({
      user: req.user._id,
      store,
    });
  
    if (existingReview) {
      res.status(400);
      throw new Error("You have already reviewed this store.");
    }
  
    const review = await Review.create({
      user: req.user._id,
      store,
      rating,
      comment,
      anonymous,
    });
  
    res.status(201).json(review);
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

    await review.deleteOne();
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
  
  
  
  