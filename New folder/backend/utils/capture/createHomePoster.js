import dotenv from "dotenv";
import { captureStoreHomePoster } from "../helperFunctions.js"; 
import { uploadToUploads } from "../../config/gcsClient.js";

dotenv.config({ path: "../../.env" });

export const createHomePoster = async () => {
  try {
    const screenshotBuffer = await captureStoreHomePoster();
    const fileName = `mall/posters/homePoster-${Date.now()}.png`;
    await uploadToUploads(screenshotBuffer, fileName);
    const publicUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${fileName}`;
    return publicUrl;
  } catch (error) {
    console.error("❌ Failed to create Home Poster:", error);
    process.exit(1);
  }
};

// Execute immediately when run from terminal
createHomePoster().then(url => console.log(url));
