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
    required: true,
  },
  duration: {
    type: String, // E.g., "30 minutes", "1 hour"
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  thumbnail: {
    type: String,
  },
  images: [{
    type: String,
  }],
  category: {
    type: String
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
}, { timestamps: true });


const Service = mongoose.model('Service', serviceSchema);
export default Service;
