import Review from "../models/ReviewModel.js";
import Store from "../models/StoreModel.js";
import mongoose from "mongoose";

/**
 * Calculate and update store rating based on all reviews
 * @param {string} storeId - The store ID to update rating for
 * @returns {Promise<Object>} Updated rating object or null if no reviews
 */
export const updateStoreRating = async (storeId) => {
  try {
    // Aggregate ratings for the store
    const stats = await Review.aggregate([
      { $match: { store: new mongoose.Types.ObjectId(storeId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          numberOfRatings: { $sum: 1 },
        },
      },
    ]);

    let ratingData;
    
    if (!stats || stats.length === 0) {
      // No reviews found, set rating to defaults
      ratingData = {
        averageRating: 0,
        numberOfRatings: 0,
      };
    } else {
      // Format rating data
      ratingData = {
        averageRating: Math.round(stats[0].averageRating * 100) / 100, // Round to 2 decimal places
        numberOfRatings: stats[0].numberOfRatings,
      };
    }

    // Update the store with new rating
    const updatedStore = await Store.findByIdAndUpdate(
      storeId,
      { rating: ratingData },
      { new: true, runValidators: true }
    );

    if (!updatedStore) {
      throw new Error("Store not found");
    }

    return ratingData;
  } catch (error) {
    console.error("Error updating store rating:", error);
    throw error;
  }
};

/**
 * Update ratings for multiple stores (useful for batch operations)
 * @param {string[]} storeIds - Array of store IDs to update
 * @returns {Promise<Object[]>} Array of updated rating objects
 */
export const updateMultipleStoreRatings = async (storeIds) => {
  try {
    const updatePromises = storeIds.map(storeId => updateStoreRating(storeId));
    const results = await Promise.allSettled(updatePromises);
    
    return results.map((result, index) => ({
      storeId: storeIds[index],
      success: result.status === 'fulfilled',
      rating: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason.message : null,
    }));
  } catch (error) {
    console.error("Error updating multiple store ratings:", error);
    throw error;
  }
};

/**
 * Initialize ratings for all stores (useful for migration)
 * @returns {Promise<number>} Number of stores updated
 */
export const initializeAllStoreRatings = async () => {
  try {
    // Get all store IDs
    const stores = await Store.find({}, '_id');
    const storeIds = stores.map(store => store._id.toString());
    
    console.log(`Initializing ratings for ${storeIds.length} stores...`);
    
    const results = await updateMultipleStoreRatings(storeIds);
    const successCount = results.filter(result => result.success).length;
    
    console.log(`Successfully updated ratings for ${successCount} out of ${storeIds.length} stores`);
    
    return successCount;
  } catch (error) {
    console.error("Error initializing store ratings:", error);
    throw error;
  }
};