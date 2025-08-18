import mongoose from "mongoose";

const PosterSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
    },
    layout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StoreLayout",
    },
    screenshot: {
        type: String,
    },
    type: {
        type: String,
        enum: ["digital", "physical"],
        default: "digital"
    },
    variation: {
        type: String,
        enum: ["mobileOnly", "allDevices", "mobileAndPC"],
        default: "default"
    },
    background: {
        image: {
            url: {
                type: String,
            },
            opacity: {
                type: String,
            },
            height: {
                type: String,
            },
            width: {
                type: String,
            }
        },
        color: {
            type: String,
            default: "#FFFFFF"
        },
        opacity: {
            type: String,
        }
    },
    text: {
        input: {
            type: String,
        },
        color: {
            type: String,
        },
        fontWeight: {
            type: String,
        },
        fontFamily: {
            type: String,
        }
    },
    deviceColor: { 
        type: String,
    },
    images: {
        mobile: [{
            type: String,
        }],
        desktop: {
            type: String,
        },
        tablet: {
            type: String,
        }
    }
})

const Poster = mongoose.model("Poster", PosterSchema);

export default Poster;