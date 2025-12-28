import mongoose from "mongoose";
import dotenv from "dotenv";
import StoreLayout from "../../models/StoreLayout.js";
import Section from "../../models/SectionModel.js";
import { captureScreenshot } from "../../config/puppeteerConfig.js";
import { uploadToUploads } from "../../config/gcsClient.js";

dotenv.config({ path: "../../../.env" });

const captureLayoutSections = async (layoutId) => {
  if (!layoutId) {
    console.error("❌ Layout ID is required");
    process.exit(1);
  }

  console.log("MONGODB_URL:", process.env.MONGODB_URL);

  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect("mongodb+srv://gizahlela_db_user:nIc44vojis9UcY9V@cluster0.jf9trd5.mongodb.net/the_mall", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // 2️⃣ Find the layout
    const layout = await StoreLayout.findById(layoutId);
    if (!layout) {
      console.error(`❌ Layout with ID ${layoutId} not found`);
      return;
    }

    console.log(`🧩 Capturing sections for layout: ${layout.name} (${layoutId})`);

    // 3️⃣ Capture screenshots for each section in routes
    for (const routeName of layout.routeOrder) {
      const route = layout.routes[routeName];
      if (!route) {
        console.log(`⚠️ Skipping route ${routeName}: route not defined`);
        continue;
      }

      if (!route.contains || route.contains.length === 0) {
        console.log(`⚠️ Skipping route ${routeName}: no contains`);
        continue;
      }

      for (const sectionName of route.contains) {
        const url = `http://localhost:5173/layouts/${layoutId}/preview${route.url}#${sectionName}`;
        console.log(`⚡ Capturing for ${sectionName} in ${routeName} at ${url}`);

        try {
          // Mobile screenshot
          const mobileBuffer = await captureScreenshot(url, 360, 740);
          const mobileFileName = `layout-sections/${layoutId}/${layout.name.replace(/\s+/g, '_')}_${sectionName}_mobile.png`;
          await uploadToUploads(mobileBuffer, mobileFileName);
          const mobileUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${mobileFileName}`;
          console.log(`✅ Mobile screenshot uploaded: ${mobileUrl}`);

          // Desktop screenshot
          const desktopBuffer = await captureScreenshot(url, 1280, 720);
          const desktopFileName = `layout-sections/${layoutId}/${layout.name.replace(/\s+/g, '_')}_${sectionName}_desktop.png`;
          await uploadToUploads(desktopBuffer, desktopFileName);
          const desktopUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${desktopFileName}`;
          console.log(`✅ Desktop screenshot uploaded: ${desktopUrl}`);

          // Create Section document after successful screenshot upload
          const sectionNameFormatted = `${layout.name} ${sectionName}`;
          const newSection = await Section.create({
            name: sectionNameFormatted,
            variation: sectionName, // Add the variation field
            layout: layoutId,
            images: {
              mobile: mobileUrl,
              desktop: desktopUrl,
            },
          });
          console.log(`✅ Section document created: ${sectionNameFormatted}`);

        } catch (error) {
          console.error(`❌ Failed to capture screenshots for ${sectionName} in ${routeName}:`, error.message);
        }
      }
    }

    console.log("🎯 Section screenshot capture complete!");
  } catch (error) {
    console.error("❌ Error capturing layout sections:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

// Get layoutId from command line arguments
const layoutId = process.argv[2];
captureLayoutSections(layoutId);

export default captureLayoutSections;