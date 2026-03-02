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