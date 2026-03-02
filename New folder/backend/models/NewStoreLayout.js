import mongoose from "mongoose";

const newStoreLayoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Store layout name is required"],
    },
    colors: {
        primary: {
            type: String,
            default: "#000000",
        },
        secondary: {
            type: String,
            default: "#FFFFFF",
        },
        accent: {
            type: String,
            default: "#FF0000",
        },
        quad: {
            type: String,
            default: "#000000",
        },
        pent: {
            type: String,
            default: "#FFFFFF",
        }
    },
    fonts: {
        primary: {
            type: String,
            default: "Arial",
        },
        secondary: {
            type: String,
            default: "Helvetica",
        },
        tertiary: {
            type: String,
            default: "Times New Roman",
        }
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
    },
})