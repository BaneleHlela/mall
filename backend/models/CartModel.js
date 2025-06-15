import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true
    },
    items: [
        {
            quantity: {
                type: Number,
                default: 1,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            specialRequest: {
                type: String,
            }
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
