import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "store",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
            price: {
                type: Number,
                required: true
            }
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Paystack'],
    },
    deliveryStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled', 'Collected'],
        default: 'Pending',
    },
    deliveryOption: {
        type: String,
        enum: ['Delivery', 'Pick Up'],
        required: true,
        default: 'Delivery',
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: function () {
            return this.deliveryOption === 'Delivery';
        },
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;