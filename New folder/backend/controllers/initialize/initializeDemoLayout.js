import mongoose from "mongoose";
import dotenv from "dotenv";
import StoreLayout from "../../models/StoreLayout.js";

dotenv.config({ path: "../../../.env" });

const initializeDemoLayouts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB");

    const result = await StoreLayout.updateMany({}, { $set: { isDemo: true } });
    console.log(`✅ Updated ${result.modifiedCount} layouts to set isDemo: true`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating layouts:", error);
    process.exit(1);
  }
};

initializeDemoLayouts();
