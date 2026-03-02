import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      variation: {
        type: String, // Matches product.prices[].variation
      },
      price: {
        type: Number, // Snapshot of the selected variation's price (or main product price)
        required: true,
        min: 0,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      specialRequest: {
        type: String,
        trim: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
}, {
  timestamps: true,
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
