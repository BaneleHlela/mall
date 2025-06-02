import mongoose from "mongoose";

const storeLayoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Store layout name is required"],
    },
    imageUrl: {
        type: String,
        default: "",
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
    },
    menubar: {
        topbar: {
            isSticky: { type: Boolean, default: true },
            background: {
                height: {
                    type: Number,
                    default: 10,
                },
            },
            links: {
                text: {
                    fontFamily: {
                        type: String,
                        default: "AR One Sans",
                    }
                },
            },
        },
        sidebar: {
            coverHeader: { 
                type: Boolean,
                default: true,
            },
            layoutStyle: {
                type: Array,
                default: ["logo", "links", "extras"],
            },
            links: {
                text: {
                    fontFamily: {
                        type: String,
                        default: "AR One Sans",
                    }
                },
            },
        },
    },
    header: {
        
    },

    footer: {
        
    },
}, { 
        timestamps: true 
});

const StoreLayout = mongoose.model("StoreLayout", storeLayoutSchema);

export default StoreLayout;