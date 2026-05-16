import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  duration: {
    type: Number, // (in minutes)
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  performers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  images: {
    type: [String],
  },
  category: {
    type: String
  },
  slug: {
    type: String,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  perfomanceStats: {
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    interactions: {
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
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
}, { timestamps: true });


const Service = mongoose.model('Service', serviceSchema);
export default Service;
