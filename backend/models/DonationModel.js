import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  images: {
    type: [String],
    required: true,
  },
  perfomanceStats: {
    interactions: {
      type: Number,
      default: 0,
      min: 0,
    },
    donations: {
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
      }
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
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
  isActive: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
  },
}, {
  timestamps: true,
});


const Donation = mongoose.model('Donation', donationSchema);
export default Donation;