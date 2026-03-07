import mongoose from "mongoose";
import dotenv from "dotenv";
import Store from "../../models/StoreModel.js";
import { captureStoreCardThumbnail, captureReelyThumbnail } from "../../utils/helperFunctions.js";
import { uploadToUploads, deleteFromUploads } from "../../config/gcsClient.js";

dotenv.config({ path: "../../../.env" });

const initializeStoreThumbnails = async () => {
  console.log("MONGODB_URL:", process.env.MONGODB_URL);
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // 2. Find ALL stores (regardless of existing thumbnails)
    const stores = await Store.find({});

    if (stores.length === 0) {
      console.log("No stores found!");
      return;
    }

    console.log(`Found ${stores.length} stores to process.`);

    // 3. Process each store
    for (const store of stores) {
      try {
        // Get layoutId from website configuration
        const layoutId = store.website?.layoutId;
        if (!layoutId) {
          console.log(`⚠️ Skipping store ${store._id} - no layoutId set in website configuration`);
          continue;
        }

        console.log(`📸 Processing thumbnails for store: ${store._id} (${store.name || "Unnamed"}) with layoutId: ${layoutId}`);

        // Delete old thumbnails if they exist
        if (store.thumbnails && store.thumbnails.storeCard) {
          try {
            const oldStoreCardPath = store.thumbnails.storeCard.replace("https://storage.googleapis.com/the-mall-uploads-giza/", "");
            await deleteFromUploads(oldStoreCardPath);
            console.log(`🗑️ Deleted old storeCard thumbnail for store: ${store._id}`);
          } catch (err) {
            console.log(`⚠️ Could not delete old storeCard: ${err.message}`);
          }
        }

        if (store.thumbnails && store.thumbnails.reely) {
          try {
            const oldReelyPath = store.thumbnails.reely.replace("https://storage.googleapis.com/the-mall-uploads-giza/", "");
            await deleteFromUploads(oldReelyPath);
            console.log(`🗑️ Deleted old reely thumbnail for store: ${store._id}`);
          } catch (err) {
            console.log(`⚠️ Could not delete old reely: ${err.message}`);
          }
        }

        // Generate and upload storeCard thumbnail (desktop - 1447x900)
        console.log(`   📱 Capturing storeCard (desktop) for store: ${store._id} with layoutId: ${layoutId}`);
        const storeCardBuffer = await captureStoreCardThumbnail(layoutId.toString());
        const storeCardFileName = `stores/${store._id}/thumbnails/storeCard.png`;
        await uploadToUploads(storeCardBuffer, storeCardFileName);
        const storeCardUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${storeCardFileName}`;

        // Generate and upload reely thumbnail (mobile - 360x660)
        console.log(`   📱 Capturing reely (mobile) for store: ${store._id} with layoutId: ${layoutId}`);
        const reelyBuffer = await captureReelyThumbnail(layoutId.toString());
        const reelyFileName = `stores/${store._id}/thumbnails/reely.png`;
        await uploadToUploads(reelyBuffer, reelyFileName);
        const reelyUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${reelyFileName}`;

        // Update store document with the new thumbnail URLs
        store.thumbnails = {
          storeCard: storeCardUrl,
          reely: reelyUrl,
          profily: store.thumbnails?.profily || "", // Preserve profily if exists
        };
        await store.save();

        console.log(`✅ Thumbnails uploaded and saved for store: ${store._id}`);
      } catch (error) {
        console.error(`❌ Failed to process thumbnails for store ${store._id}:`, error.message);
      }
    }

    console.log("🎯 Store thumbnails initialization complete!");
  } catch (error) {
    console.error("❌ Error initializing store thumbnails:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

// Run script if executed directly
initializeStoreThumbnails();


export default initializeStoreThumbnails;
