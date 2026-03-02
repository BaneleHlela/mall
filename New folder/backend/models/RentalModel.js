import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    value: {
        type: Number,
        default: 0,
        required: true,
    },
    unit: {
        type: String,
        enum: ['minute', 'hour', 'day', 'night', 'week', 'month'],
        default: 'hour',
    }
  },
  duration: {
    value: {
      type: Number,
      required: true,
      min: 1,
    },
    unit: {
      type: String,
      enum: ['minute', 'hour', 'day', 'night', 'week', 'month'],
      default: 'hour',
    }
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  images: {
    type: [String],
    validate: [array => array.length <= 5, 'Images cannot exceed 5']
  },
  category: String,
  slug: {
    type: String,
    unique: true,
    index: true,
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

// Slug is generated in the controller

const Rental = mongoose.model('Rental', rentalSchema);
export default Rental;
