import mongoose from "mongoose";
import dotenv from "dotenv";
import Store from "../../models/StoreModel.js";
import { captureStoreThumbnail } from "../../utils/helperFunctions.js";
import { uploadToUploads } from "../../config/gcsClient.js";

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

    // 2. Find stores missing thumbnails
    const storesWithoutThumbnails = await Store.find({
      $or: [{ thumbnail: { $exists: true } }, { thumbnail: "" }],
    });

    if (storesWithoutThumbnails.length === 0) {
      console.log("🎉 All stores already have thumbnails!");
      return;
    }

    console.log(`Found ${storesWithoutThumbnails.length} stores without thumbnails.`);

    // 3. Process each store
    for (const store of storesWithoutThumbnails) {
      try {
        console.log(`📸 Capturing thumbnail for store: ${store._id} (${store.name || "Unnamed"})`);

        // Generate screenshot
        const screenshotBuffer = await captureStoreThumbnail(store._id.toString());

        // Construct path for cloud storage
        const fileName = `stores/${store._id}/thumbnail.png`;

        // Upload to GCS
        await uploadToUploads(screenshotBuffer, fileName);

        // Update store document with the public URL
        store.thumbnail = `https://storage.googleapis.com/the-mall-uploads-giza/${fileName}`;
        await store.save();

        console.log(`✅ Thumbnail uploaded and saved for store: ${store._id}`);
      } catch (error) {
        console.error(`❌ Failed to generate thumbnail for store ${store._id}:`, error.message);
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
