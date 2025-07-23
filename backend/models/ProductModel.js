import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
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
    // required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  marking: {
    type: String,
    //enum: ['new', 'sale', 'featured', ''],
    default: '',
  },
  stockQuantity: {
    type: Number,
    // required: true,
    min: 0,
  },
  sold: {
    type: Number,
    default: 0,
    min: 0, 
  },
  variations: [{
    type: String,
  }],
  images: {
    type: [String],
    required: true,
  },
  category: {
    type:  String,
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


const Product = mongoose.model('Product', productSchema);
export default Product;
