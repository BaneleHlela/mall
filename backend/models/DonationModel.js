import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the user making the donation
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store", // Reference to the store or organization receiving the donation
        required: true,
    },
    amount: {
        type: Number,
        required: true, 
        min: 0, // Minimum donation amount
    },
    message: {
        type: String,
        required: false, // Optional message from the donor
        trim: true,
    },
    isAnonymous: {
        type: Boolean,
        default: false, // Whether the donor wants to remain anonymous
    },
    category: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"], // Status of the donation
        default: "Pending",
    },
}, {
    timestamps: true,  
});

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;