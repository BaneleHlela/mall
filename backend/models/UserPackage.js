import mongoose from "mongoose";

const userPackageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true,
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true,
    },
    sessionsTotal: {
        type: Number,
        required: true,
    },
    sessionsRemaining: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'expired', 'cancelled'],
        default: 'active',
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    expiryDate: {
        type: Date,
    },
    pricePaid: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const UserPackage = mongoose.model("UserPackage", userPackageSchema);
export default UserPackage;
