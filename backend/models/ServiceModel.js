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
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  performers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
    name: {
      type: String,
    },
  }],
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
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
}, { timestamps: true });


const Service = mongoose.model('Service', serviceSchema);
export default Service;
