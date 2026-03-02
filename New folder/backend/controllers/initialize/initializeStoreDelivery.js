import mongoose from "mongoose";
import dotenv from "dotenv";
import StoreLayout from "../../models/StoreLayout.js";
import { captureStoreLayoutScreenshot } from "../../utils/helperFunctions.js";
import { uploadToUploads } from "../../config/gcsClient.js";

dotenv.config({ path: "../../../.env" });

const initializeLayoutScreenshots = async () => {
  console.log("MONGODB_URL:", process.env.MONGODB_URL);

  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // 2️⃣ Find layouts missing screenshots
    const layoutsWithoutScreenshots = await StoreLayout.find({
      $or: [{ screenshot: { $exists: true } }, { screenshot: "" }, { screenshot: null }],
    });

    if (layoutsWithoutScreenshots.length === 0) {
      console.log("🎉 All layouts already have screenshots!");
      return;
    }

    console.log(`🧩 Found ${layoutsWithoutScreenshots.length} layouts without screenshots.`);

    // 3️⃣ Capture and upload screenshots
    for (const layout of layoutsWithoutScreenshots) {
      try {
        console.log(`⚡ Capturing screenshot for layout ${layout._id}...`);

        // Capture screenshot buffer
        const screenshotBuffer = await captureStoreLayoutScreenshot(layout._id);

        // Upload to Google Cloud
        const fileName = `store-layouts/${layout._id}/layout-${Date.now()}.png`;
        await uploadToUploads(screenshotBuffer, fileName);
        const publicUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${fileName}`;

        // Save URL in DB
        layout.screenshot = publicUrl;
        await layout.save();

        console.log(`✅ Screenshot initialized for layout: ${layout._id}`);
      } catch (error) {
        console.error(`❌ Failed to capture screenshot for layout ${layout._id}:`, error.message);
      }
    }

    console.log("🎯 Layout screenshot initialization complete!");
  } catch (error) {
    console.error("❌ Error initializing layout screenshots:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

initializeLayoutScreenshots();

export default initializeLayoutScreenshots;
