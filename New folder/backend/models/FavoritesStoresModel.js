import mongoose from "mongoose";

const favoriteStoresSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    store: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store",
        require:true
    }],
},{
    timestamps:true
});

const FavoriteStores = mongoose.model("FavoriteStores", favoriteStoresSchema);
export default FavoriteStores;