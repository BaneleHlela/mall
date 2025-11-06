import mongoose from "mongoose";
import dotenv from "dotenv";
import Store from "../../models/StoreModel.js";

dotenv.config({ path: "../../../.env" });

const initializeStoreDelivery = async () => {
  console.log("MONGODB_URL:", process.env.MONGODB_URL);

  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // 2️⃣ Find stores missing 'delivers' field
    const storesWithoutDelivery = await Store.find({
      $or: [{ delivers: { $exists: false } }, { delivers: null }],
    });

    if (storesWithoutDelivery.length === 0) {
      console.log("🎉 All stores already have delivery info!");
      return;
    }

    console.log(`Found ${storesWithoutDelivery.length} stores without delivery info.`);

    // 3️⃣ Initialize 'delivers' field for each store
    for (const store of storesWithoutDelivery) {
      try {
        store.delivers = {
          enabled: true,
          range: 15,
        };
        await store.save();
        console.log(`✅ Delivery info initialized for store: ${store._id} (${store.name || "Unnamed"})`);
      } catch (error) {
        console.error(`❌ Failed to initialize delivery for store ${store._id}:`, error.message);
      }
    }

    console.log("🎯 Store delivery initialization complete!");
  } catch (error) {
    console.error("❌ Error initializing store delivery:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};


initializeStoreDelivery();

export default initializeStoreDelivery;
