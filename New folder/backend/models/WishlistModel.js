import mongoose from "mongoose";

const wishlistSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    products: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    }],
    service: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store",
    }]
},{
    timestamps:true
});

const Wishlist = mongoose.model("Wishlist",wishlistSchema);
export default Wishlist;