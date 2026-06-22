import mongoose from "mongoose";
import dotenv from "dotenv";
import Store from "../../models/StoreModel.js";

dotenv.config({ });

const initializePerformanceStats = async () => {
  console.log("MONGODB_URL:", process.env.MONGODB_URL);

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Find stores missing perfomanceStats or missing views/visits inside it
    const stores = await Store.find({
      $or: [
        { perfomanceStats: { $exists: false } },
        { "perfomanceStats.views": { $exists: false } },
        { "perfomanceStats.visits": { $exists: false } },
      ],
    });

    if (!stores.length) {
      console.log("🎉 All stores already have perfomanceStats initialized!");
      return;
    }

    console.log(`Found ${stores.length} stores to initialize perfomanceStats for.`);

    for (const store of stores) {
      try {
        // Prefer top-level `visits`, fall back to `bill.visits` if present, otherwise 0
        const legacyVisits = (typeof store.visits === 'number' && store.visits > 0)
          ? store.visits
          : (store.bill && typeof store.bill.visits === 'number' ? store.bill.visits : 0);

        // Ensure object exists
        store.perfomanceStats = store.perfomanceStats || {};

        // Save the legacy visits into both `views` and `visits` per request,
        // but do not overwrite any existing non-null values.
        if (store.perfomanceStats.views == null) store.perfomanceStats.views = legacyVisits;
        if (store.perfomanceStats.visits == null) store.perfomanceStats.visits = legacyVisits;

        await store.save();
        console.log(`✅ Initialized perfomanceStats for store ${store._id} (${store.name || 'Unnamed'}) -> ${legacyVisits}`);
      } catch (err) {
        console.error(`❌ Failed to initialize store ${store._id}:`, err.message);
      }
    }

    console.log("🎯 perfomanceStats initialization complete!");
  } catch (error) {
    console.error("❌ Error initializing perfomanceStats:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

initializePerformanceStats();

export default initializePerformanceStats;
