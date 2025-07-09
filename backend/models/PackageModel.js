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
    price: {
        type: Number,
        required: true, // Total price of the package
        min: 0,
    },
    description: {
        type: String,
        required: false, // Optional description of the package
        trim: true,
    },
    duration: {
        expires: {
            type: Boolean,
            default: true,
        },
        format: {
            type: String,
            enum: ["days", "weeks", "months", "years"],
        },
        count: {
            type: Number,
            required: true,
        },
    },
    isHighlighted: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String, // E.g. 'Best Value'
    },
    frequency: {
        type: String,
        enum: ['once', 'monthly', 'yearly', 'custom'],
        default: 'once',
    },
    features: {
        type: [String],
        default: [],
    },
    discountPercentage: {
        type: Number,
        default: 0, // Discount percentage on the package price
        min: 0,
        max: 100,
    },
    isActive: {
        type: Boolean,
        default: true, 
    },
}, {
    timestamps: true, 
});

const Package = mongoose.model("Package", packageSchema);
export default Package;
