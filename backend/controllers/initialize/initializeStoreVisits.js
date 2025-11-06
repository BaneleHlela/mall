import mongoose from "mongoose";
import dotenv from "dotenv";
import Store from "../../models/StoreModel.js";

dotenv.config({ path: "../../../.env" });

const initializeStoreVisits = async () => {
  console.log("MONGODB_URL:", process.env.MONGODB_URL);

  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // 2️⃣ Find stores missing 'visits' field or with visits = 0
    const storesWithoutVisits = await Store.find({
      $or: [{ visits: { $exists: false } }, { visits: 0 }],
    });

    if (storesWithoutVisits.length === 0) {
      console.log("🎉 All stores already have visits data!");
      return;
    }

    console.log(`Found ${storesWithoutVisits.length} stores without visits.`);

    // 3️⃣ Assign random visits between 5000 and 20000
    for (const store of storesWithoutVisits) {
      try {
        const randomVisits = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
        store.visits = randomVisits;
        await store.save();
        console.log(`✅ Visits initialized for store: ${store._id} (${store.name || "Unnamed"}) -> ${randomVisits}`);
      } catch (error) {
        console.error(`❌ Failed to set visits for store ${store._id}:`, error.message);
      }
    }

    console.log("🎯 Store visits initialization complete!");
  } catch (error) {
    console.error("❌ Error initializing store visits:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

initializeStoreVisits();

export default initializeStoreVisits;
