import StoreLayout from "../models/StoreLayout.js";
import expressAsyncHandler from "express-async-handler";
import { captureScreenshot } from "../config/puppeteerConfig.js";
import { uploadToUploads } from "../config/gcsClient.js";


const CLIENT_URL = process.env.CLIENT_URL

// create a new layouts configuration
export const createLayoutConfig = async (req, res) => {
    try {
      const layout = await StoreLayout.create(req.body);
      const layoutId = layout._id.toString();
  
      // Generate the preview screenshot
      const previewUrl = `${CLIENT_URL}/layouts/preview/${layoutId}`;
      const screenshotBuffer = await captureScreenshot(previewUrl);
  
      // Upload to Google Cloud
      const fileName = `stores/layouts/${layoutId}/${layoutId}_preview.png`;
      await uploadToUploads(screenshotBuffer, fileName);
  
      // Save public URL in MongoDB
      const publicUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${fileName}`;
      layout.imageUrl = publicUrl;
      await layout.save();
  
      res.status(201).json(layout);
    } catch (error) {
      console.error('Error creating layout with screenshot:', error);
      res.status(500).json({ message: 'Failed to create layout with screenshot' });
    }
};

// Fetch Layout Configuration
export const getLayoutConfig = expressAsyncHandler(async (req, res) => {
    const { layoutId } = req.params;  // Assume you're passing layoutId instead of storeId

    const layout = await StoreLayout.findById(layoutId);  // Use findById to get the layouts

    if (!layout) {
        res.status(404);
        throw new Error("Layout configuration not found.");
    }

    res.json(layout);
});

// Update Layout Configuration
export const updateLayoutConfig = expressAsyncHandler(async (req, res) => {
    const { layoutId } = req.params;
    const  layoutConfig  = req.body;

    // Update the layouts in the Layouts collection
    const updatedLayout = await StoreLayout.findByIdAndUpdate(
        layoutId,
        { $set: layoutConfig },
        { new: true } // Return the updated document
    );

    if (!updatedLayout) {
        res.status(404);
        throw new Error("Layout configuration not found.");
    }

    res.json({
        message: "Layout updated successfully.",
        layout: updatedLayout,
    });
});

// Delete Layout Configuration
export const deleteLayoutConfig = expressAsyncHandler(async (req, res) => {
    const { layoutId } = req.params;  

    const deletedLayout = await StoreLayout.findByIdAndDelete(layoutId);  // Use findByIdAndDelete to remove the layouts

    if (!deletedLayout) {
        res.status(404);
        throw new Error("Layout configuration not found.");
    }

    res.json({ message: "Layout configuration deleted successfully." });
});

