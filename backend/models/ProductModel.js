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
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  sold: {
    type: Number,
    default: 0,
    min: 0, 
  },
  variations: [
    {
      size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], // Optional
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  brand: {
    type: String,
    required: true,
  },
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
  isFeatured: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String], 
  },
}, {
  timestamps: true,
});

// Generate slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 100);
}

productSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = createSlug(this.name);
  }
  next();
});

// Optional: virtual discounted price
productSchema.virtual('discountedPrice').get(function () {
  return this.price - (this.price * this.discountPercentage) / 100;
});

const Product = mongoose.model('Product', productSchema);
export default Product;
