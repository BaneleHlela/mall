import mongoose from "mongoose";

const storeLayoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Store layout name is required"],
    },
    routes: {},
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
    menubar: {},
    hero: {},
    order: {},
    //book: {},
    about: {},
    //gallery: {},
    products: {},
    // services: {},
    reviews: {},
    contact: {},
    bookWithCalender: {},
    menu: {},
    footer: {
        
    },
}, { 
        timestamps: true 
});

const StoreLayout = mongoose.model("StoreLayout", storeLayoutSchema);

export default StoreLayout;