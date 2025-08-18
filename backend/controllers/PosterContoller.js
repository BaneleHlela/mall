import Poster from "../models/PosterModel.js";
import { captureScreenshot } from "../config/puppeteerConfig.js";
import { uploadToUploads } from "../config/gcsClient.js";
import expressAsyncHandler from "express-async-handler";


const CLIENT_URL = process.env.CLIENT_URL;

export const createPoster = async (req, res) => {
  try {
    const { type, layout, store, variation, background, images, deviceColor, imageSource, text } = req.body;

    // Create poster with initial data (empty image URLs for now)
    const poster = new Poster({
      type,
      layout,
      store,
      variation,
      background,
      text,
      deviceColor,
      images: {
        mobile: [],
        desktop: "",
        tablet: "",
      },
      screenshot: "",
    });

    // Device screenshot configurations
    const screenshotConfig = {
      desktop: { width: 1500, height: 800 },
      tablet: { width: 775, height: 1024 },
      mobile: { width: 350, height: 740 },
    };

    // Screenshots for each device if capture is true
    if (imageSource.desktop?.capture) {
      const url = `${CLIENT_URL}/layouts/${layout}/preview/${imageSource.desktop.page}#${imageSource.desktop.section || ""}`;
      const buffer = await captureScreenshot(url, screenshotConfig.desktop.width, screenshotConfig.desktop.height);
      const fileName = `stores/${store}/posters/${poster._id}/desktop.png`;
      await uploadToUploads(buffer, fileName);
      poster.images.desktop = `https://storage.googleapis.com/the-mall-uploads-giza/${fileName}`;
    }

    if (imageSource.tablet?.capture) {
      const url = `${CLIENT_URL}/layouts/${layout}/preview/${imageSource.tablet.page}#${imageSource.tablet.section || ""}`;
      const buffer = await captureScreenshot(url, screenshotConfig.tablet.width, screenshotConfig.tablet.height);
      const fileName = `stores/${store}/posters/${poster._id}/tablet.png`;
      await uploadToUploads(buffer, fileName);
      poster.images.tablet = `https://storage.googleapis.com/the-mall-uploads-giza/${fileName}`;
    }

    if (Array.isArray(imageSource.mobile)) {
      poster.images.mobile = [];
      for (let i = 0; i < imageSource.mobile.length; i++) {
        const mobileConfig = imageSource.mobile[i];
        if (mobileConfig?.capture) {
          const url = `${CLIENT_URL}/layouts/${layout}/preview/${mobileConfig.page}#${mobileConfig.section || ""}`;
          const buffer = await captureScreenshot(url, screenshotConfig.mobile.width, screenshotConfig.mobile.height);
          const fileName = `stores/${store}/posters/${poster._id}/mobile_${i + 1}.png`;
          await uploadToUploads(buffer, fileName);
          poster.images.mobile.push(`https://storage.googleapis.com/the-mall-uploads-giza/${fileName}`);
        } else {
          poster.images.mobile.push("");
        }
      }
    }

    

    const result = await poster.save();
    
    // Take a screenshot of the poster view page
    const posterViewUrl = `${CLIENT_URL}/dashboard/${store}/posters/view/${result._id}`;
    const screenshotBuffer = await captureScreenshot(posterViewUrl, 839, 839); // Adjust dimensions as necessary
    const screenshotFileName = `stores/${store}/posters/${result._id}/poster_view.png`;
    await uploadToUploads(screenshotBuffer, screenshotFileName);
    
    // Update the poster with the screenshot URL
    result.screenshot = `https://storage.googleapis.com/the-mall-uploads-giza/${screenshotFileName}`;
    await result.save();

    res.status(201).json(poster);
  } catch (error) {
    console.error("Error creating poster:", error);
    res.status(500).json({ message: "Failed to create poster" });
  }
};

export const fetchStorePosters = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  if (!storeId) {
    res.status(400);
    throw new Error("Store ID is required");
  }

  const posters = await Poster.find({ store: storeId })
    .populate("store", "name") // Optional: populate store details
    .populate("layout", "name"); // Optional: populate layout details

  res.status(200).json(posters);
});

// Fetch poster by ID
export const fetchPosterById = expressAsyncHandler(async (req, res) => {
  const { posterId } = req.params;

  if (!posterId) {
    res.status(400);
    throw new Error("Poster ID is required");
  }

  // Find the poster by its ID
  const poster = await Poster.findById(posterId)
    .populate("store", "name") // Optional: populate store details
    .populate("layout", "name"); // Optional: populate layout details

  if (!poster) {
    res.status(404);
    throw new Error("Poster not found");
  }

  res.status(200).json(poster);
});
