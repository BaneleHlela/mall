import mongoose from "mongoose";

const SearchPostSchema = new mongoose.Schema({
    variation: { // Component variation (e.g., "carousel", "grid", "list")
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["custom"]
    },
    departments: [{
        type: String,
    }],
    stores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    }],
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    }],
    style: {
        text: {
            // heading: {
            //     type: String,
            // },
            // subheading: {   
            //     type: String,
            // }
        },
        colors: {
            // backgroundColor: {
            //     type: String,
            // },
            // accentColor: {
            //     type: String,
            // },
        },
        content: {
            // largeImage: {},
            // carousel: {
            //     viewAllButton: {
            //         show: {
            //             type: Boolean,
            //         },
            //         route: {
            //             type: String,
            //         }
            //     }
            // },
        },
        button: {
            function: {
                type: String,
            }
        },
        
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    stats: {
        clicks: {
            type: Number,
            default: 0,
        },
        likelihoodIndex: {
            type: Number,
            default: 1,
            min: 1
        }
    },
    // likelihoodIndex: {
    //     type: Number,
    //     default: 1,
    //     min: 1
    // }
});

const SearchPost = mongoose.model("SearchPost", SearchPostSchema);

export default SearchPost;