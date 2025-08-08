import mongoose from "mongoose";

const storeLayoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Store layout name is required"],
    },
    routes: {},
    floats: {},
    routeOrder: [{
        type: String,
    }],
    background: {},
    fonts: {},
    imageUrl: {
        type: String,
        default: "",
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
    },
    isDemo: {
        type: Boolean,
        default: true,
    },
    menubar: {},
    hero: {
        type: Object,
    },
    order: {
        type: Object,
    },
    book: {},
    about: {

    },
    gallery: {},
    products: {},
    services: {},
    reviews: {},
    contact: {},
    singleProduct: {},
    bookWithCalender: {},
    menu: {},
    bookService: {},
    footer: {
        
    },
    colors: {
        type: Array,
        default: [],
    },
}, { 
        timestamps: true 
});

const StoreLayout = mongoose.model("StoreLayout", storeLayoutSchema);

export default StoreLayout;