import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true, 
    },
    name: {
        type: String,
        required: true, // Name of the package, for e.g. "New Client Deal", "Platinum Unlimited Package"
        trim: true,
    },
    description: {
        type: String,
        required: false, // Optional description of the package
        trim: true,
    },
    items: [
        {
            productOrServiceId: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: "items.type", // Dynamically reference either "Product" or "Service"
                required: false,
            },
            type: {
                type: String,
                enum: ["Product", "Service"], // Specify whether it's a product or service
                required: false,
            },
            quantity: {
                type: Number,
                required: false,
                min: 1, // Minimum quantity is 1
            },
        },
    ],
    duration: {
        value: {
            type: Number, // Duration value (e.g., 30, 60)
            required: true,
            min: 0,
        },
        unit: {
            type: String, // Unit of time (e.g., "minutes", "hours", "days")
            enum: ["hours", "days", "weeks", "months"], // Specify the allowed units
            required: true,
        },
    },
    recurring: {
        isRecurring: {
            type: Boolean, 
            default: false,
        },
        interval: {
            type: String, // Interval for recurrence (e.g., "weekly", "monthly")
            enum: ["daily", "weekly", "monthly", "yearly"],
            required: function () {
                return this.recurring.isRecurring; // Required if the package is recurring
            },
        },
        cycles: {
            type: Number, // Number of cycles for the recurrence (e.g., 12 for 12 months)
            min: 1,
            required: false, // Optional: If not provided, it can recur indefinitely
        },
    },
    benefits: [{
        type: String,
        required: false, // Optional benefits of the package
        trim: true,
    }],
    price: {
        type: Number,
        required: true, // Total price of the package
        min: 0,
    },
    discountPercentage: {
        type: Number,
        default: 0, // Discount percentage on the package price
        min: 0,
        max: 100,
    },
    isAvailable: {
        type: Boolean,
        default: true, 
    },
}, {
    timestamps: true, 
});

const Package = mongoose.model("Package", packageSchema);
export default Package;