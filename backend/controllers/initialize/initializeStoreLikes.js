import mongoose from "mongoose";
import dotenv from "dotenv";
import Store from "../../models/StoreModel.js"; // <-- Update the path if needed

dotenv.config({ path: "../../../.env" });

const initializeLikes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    // Find stores that don't have a 'likes' field
    const storesWithoutLikes = await Store.find({ likes: { $exists: false } });

    console.log(`Found ${storesWithoutLikes.length} stores without 'likes' field`);

    for (const store of storesWithoutLikes) {
      store.likes = {
        count: 0,
        users: []
      };

      await store.save();
      console.log(`Updated store ${store._id} with default likes`);
    }

    console.log("Likes initialization complete.");
    process.exit(0);
  } catch (error) {
    console.error("Error initializing likes:", error);
    process.exit(1);
  }
};

initializeLikes();
