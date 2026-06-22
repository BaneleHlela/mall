import mongoose from "mongoose";

const performanceStatsSchema = new mongoose.Schema({
    views: { // For products
      type: Number,
      default: 0,
      min: 0,
    },
    visits: { // for stores (we can collapse this with views if we want to)
        type: Number,
        default: 0,
        min: 0,
    },
    purchases: {
      type: Number,
      default: 0,
      min: 0,
    },
    ratingSummary: {
      averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      numberOfRatings: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    likes: {
      count: { type: Number, default: 0, min: 0 },
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    }],
  }, { _id: false });

export default performanceStatsSchema;