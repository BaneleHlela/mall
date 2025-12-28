import mongoose from "mongoose";

const storeLayoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Store layout name is required"],
    },
    nickname: {
        type: String,
        required: false,
    },
    screenshot: {
        type: String,
        default: "",
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
    },
    routes: {},
    routeOrder: [{
        type: String,
    }],
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
    isDemo: {
        type: Boolean,
        default: true,
    },
    floats: {},
    background: {},
    menubar: {},
    sections: {
        hero: {},
        about: {},
        nabout: {},
        products: {},
        services: {},
        rentals: {},
        donations: {},
        packages: {},
        FAQs: {},
        gallery: {},
        contact: {},
        footer: {},
        searchResults: {},
        singleProduct: {},
        bookService: {},
    },
}, { 
    timestamps: true 
});

const StoreLayout = mongoose.models.StoreLayout || mongoose.model("StoreLayout", storeLayoutSchema);

export default StoreLayout;