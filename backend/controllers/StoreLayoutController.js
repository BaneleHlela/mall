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
  
      //Generate the preview screenshot
      const previewUrl = `${CLIENT_URL}/layouts/${layoutId}/preview`;
      const screenshotBuffer = await captureScreenshot(previewUrl, 360, 740);
  
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


export const createLayoutConfigWithSettings = async (req, res) => {
    try {
      const { layoutId, newColors, oldColors, newFonts } = req.body;
  
      // Fetch the original layout
      const originalLayout = await StoreLayout.findById(layoutId);
      if (!originalLayout) {
        return res.status(404).json({ message: 'Original layout not found.' });
      }
  
      const clonedLayout = JSON.parse(JSON.stringify(originalLayout)); // Deep clone layout
      delete clonedLayout._id;
      const fonts = { ...originalLayout.fonts }; // Clone fonts if needed
  
      // === Replace Colors Recursively ===
      const replaceColors = (node) => {
        if (typeof node === 'object' && node !== null) {
          for (const key in node) {
            if (typeof node[key] === 'string') {
              const colorIndex = oldColors.indexOf(node[key]);
              if (colorIndex !== -1 && newColors[colorIndex]) {
                node[key] = newColors[colorIndex];
              }
            } else {
              replaceColors(node[key]);
            }
          }
        }
      };
  
      // === Replace Fonts ===
      const updatedFonts = { ...fonts };
  
      if (newFonts.primary && fonts.primary && newFonts.primary !== fonts.primary) {
        updatedFonts.primary = newFonts.primary;
      }
      if (newFonts.secondary && fonts.secondary && newFonts.secondary !== fonts.secondary) {
        updatedFonts.secondary = newFonts.secondary;
      }
      if (newFonts.tertiary && fonts.tertiary && newFonts.tertiary !== fonts.tertiary) {
        updatedFonts.tertiary = newFonts.tertiary;
      }
  
      const replaceFonts = (node) => {
        if (typeof node === 'object' && node !== null) {
          for (const key in node) {
            if (typeof node[key] === 'string') {
              const fontIndex = Object.values(fonts).indexOf(node[key]);
              const newFont = Object.values(newFonts)[fontIndex];
              if (fontIndex !== -1 && newFont) {
                node[key] = newFont;
              }
            } else {
              replaceFonts(node[key]);
            }
          }
        }
      };
      
  
      // Apply replacements
      replaceColors(clonedLayout);
      replaceFonts(clonedLayout);

  
      // === Create New Layout ===
      const newLayout = await StoreLayout.create({
        ...clonedLayout,
        fonts: updatedFonts,
        colors: newColors,
        name: "New Layout with Updated Settings",
      });
  
      const newLayoutId = newLayout._id.toString();
      const previewUrl = `${CLIENT_URL}/layouts/${newLayoutId}/preview`;
  
      // Screenshot
      const screenshotBuffer = await captureScreenshot(previewUrl, 360, 740);
      const fileName = `stores/layouts/${newLayoutId}/${newLayoutId}_preview.png`;
      await uploadToUploads(screenshotBuffer, fileName);
      const publicUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${fileName}`;
  
      newLayout.imageUrl = publicUrl;
      // Assuming storeId is passed in the request body
      await newLayout.save();
  
      res.status(201).json(newLayout);
    } catch (error) {
      console.error('Error creating layout with updated fonts/colors:', error);
      res.status(500).json({ message: 'Failed to create layout.' });
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


// Get Layout by Demo Store
export const getLayoutByDemoStore = expressAsyncHandler(async (req, res) => {
    const { storeId } = req.params;

    // Find the layout where the store field matches the given storeId
    const layout = await StoreLayout.findOne({ store: storeId });

    if (!layout) {
        res.status(404);
        throw new Error("Layout configuration not found for this store.");
    }

    res.json(layout);
});


// Get Layout by Store
export const getLayoutByStore = expressAsyncHandler(async (req, res) => {
    const { storeId } = req.params;

    // Find the layout where the store field matches the given storeId
    const layout = await StoreLayout.findOne({ store: storeId });

    if (!layout) {
        res.status(404);
        throw new Error("Layout configuration not found for this store.");
    }

    res.json(layout);
});

export const getDemoLayouts = expressAsyncHandler(async (req, res) => {
    // Fetch all demo layouts
    const demoLayouts = await StoreLayout.find({ isDemo: true });

    console.log("Demo Layouts:", demoLayouts);

    if (!demoLayouts || demoLayouts.length === 0) {
        res.status(404);
        throw new Error("No demo layouts found.");
    }

    res.json(demoLayouts);
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

// replace a color in the layout configuration
export const replaceLayoutColor = expressAsyncHandler(async (req, res) => {
    const { layoutId } = req.params;
    const { oldColor, newColor } = req.body;
  
    if (!oldColor || !newColor) {
      return res.status(400).json({ message: 'Both oldColor and newColor are required.' });
    }
  
    const layout = await StoreLayout.findById(layoutId);
    if (!layout) {
      return res.status(404).json({ message: 'Layout not found.' });
    }
  
    let updated = false;
  
    const replaceColorRecursively = (obj) => {
      for (const key in obj) {
        const value = obj[key];
  
        if (typeof value === 'string' && value.toLowerCase() === oldColor.toLowerCase()) {
          obj[key] = newColor;
          updated = true;
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'string' && item.toLowerCase() === oldColor.toLowerCase()) {
              value[index] = newColor;
              updated = true;
            } else if (typeof item === 'object' && item !== null) {
              replaceColorRecursively(item);
            }
          });
        } else if (typeof value === 'object' && value !== null) {
          replaceColorRecursively(value);
        }
      }
    };
  
    // Work on the raw object inside the Mongoose document
    const layoutObject = layout.toObject();
    replaceColorRecursively(layoutObject);
  
    if (!updated) {
      return res.status(400).json({ message: 'Old color not found in layout.' });
    }
  
    // Set updated object and save
    layout.set(layoutObject);
    const savedLayout = await layout.save();
  
    res.json({
      message: 'Color replaced successfully.',
      layoutId,
      oldColor,
      newColor,
      layout: savedLayout,
    });
});
  
  
  