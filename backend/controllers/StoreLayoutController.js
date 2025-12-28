import StoreLayout from "../models/StoreLayout.js";
import expressAsyncHandler from "express-async-handler";
import { captureScreenshot } from "../config/puppeteerConfig.js";
import { uploadToUploads, deleteFromUploads } from "../config/gcsClient.js";
import { captureStoreLayoutScreenshot } from "../utils/helperFunctions.js";
import _ from "lodash";

const CLIENT_URL = process.env.CLIENT_URL

// create a new layouts configuration
export const createLayoutConfig = async (req, res) => {
    try {
      const layout = await StoreLayout.create(req.body);
      // const layoutId = layout._id.toString();
   
      //Generate the preview screenshot
      // const previewUrl = `${CLIENT_URL}/layouts/${layoutId}/preview`;
      // const screenshotBuffer = await captureScreenshot(previewUrl, 360, 740);
   
      // Upload to Google Cloud
      // const fileName = `stores/layouts/${layoutId}/${layoutId}_preview.png`;
      // await uploadToUploads(screenshotBuffer, fileName);
   
      // // Save public URL in MongoDB
      // const publicUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${fileName}`;
      // layout.imageUrl = publicUrl;
      // await layout.save();
   
      res.status(201).json(layout);
    } catch (error) {
      console.error('Error creating layout with screenshot:', error);
      res.status(500).json({ message: 'Failed to create layout with screenshot' });
    }
};


export const createLayoutConfigWithSettings = async (req, res) => {
    try {
      const { layoutId, newColors, newFonts, sectionUpdates, store } = req.body;

      // Fetch the original layout
      const originalLayout = await StoreLayout.findById(layoutId);
      if (!originalLayout) {
        return res.status(404).json({ message: 'Original layout not found.' });
      }

      const clonedLayout = JSON.parse(JSON.stringify(originalLayout)); // Deep clone layout
      delete clonedLayout._id;

      // === Apply Section Updates ===
      if (sectionUpdates) {
        Object.keys(sectionUpdates).forEach(sectionKey => {
          if (clonedLayout[sectionKey]) {
            clonedLayout[sectionKey] = { ...clonedLayout[sectionKey], ...sectionUpdates[sectionKey] };
          }
        });
      }

      // === Create New Layout ===
      const newLayout = await StoreLayout.create({
        ...clonedLayout,
        fonts: newFonts || clonedLayout.fonts,
        colors: newColors || clonedLayout.colors,
        name: "New Layout with Updated Settings",
        store
      });
  
      const newLayoutId = newLayout._id.toString();
      const previewUrl = `${CLIENT_URL}/layouts/${newLayoutId}/preview`;
  
      // Screenshot
      const screenshotBuffer = await captureScreenshot(previewUrl, 360, 740);
      const fileName = `stores/layouts/${newLayoutId}/${newLayoutId}_preview.png`;
      await uploadToUploads(screenshotBuffer, fileName);
      const publicUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${fileName}`;
  
      newLayout.imageUrl = publicUrl;
      await newLayout.save();

      // === Add layout ID to store's layouts array ===
      const Store = (await import('../models/StoreModel.js')).default;
      await Store.findByIdAndUpdate(
        store,
        { $addToSet: { layouts: newLayoutId } }, // $addToSet prevents duplicates
        { new: true }
      );
  
      res.status(201).json(newLayout);
    } catch (error) {
      console.error('Error creating layout with updated fonts/colors:', error);
      res.status(500).json({ message: 'Failed to create layout.' });
    }
};

export const updateLayoutConfigWithSettings = async (req, res) => {
    try {
      const { layoutId, newColors, newFonts, sectionUpdates, store } = req.body;

      // Fetch the existing layout
      const existingLayout = await StoreLayout.findById(layoutId);
      if (!existingLayout) {
        return res.status(404).json({ message: 'Layout not found.' });
      }

      let updatedLayout = JSON.parse(JSON.stringify(existingLayout));

      // Apply color changes if provided
      if (newColors) {
        updatedLayout.colors = newColors;
      }

      // Apply font changes if provided
      if (newFonts) {
        updatedLayout.fonts = { ...existingLayout.fonts, ...newFonts };
      }

      // Apply section updates if provided
      if (sectionUpdates) {
        Object.keys(sectionUpdates).forEach(sectionKey => {
          if (updatedLayout[sectionKey]) {
            updatedLayout[sectionKey] = { ...updatedLayout[sectionKey], ...sectionUpdates[sectionKey] };
          }
        });
      }

      // Update the layout in the database
      const savedLayout = await StoreLayout.findByIdAndUpdate(
        layoutId,
        { $set: updatedLayout },
        { new: true }
      );

      res.status(200).json(savedLayout);
    } catch (error) {
      console.error('Error updating layout with settings:', error);
      res.status(500).json({ message: 'Failed to update layout.' });
    }
};
   
export const getStoreLayouts = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  if (!storeId) {
    res.status(400);
    throw new Error("Store ID is required.");
  }
  
  const layouts = await StoreLayout.find({
    store: storeId
  }).populate('store', '_id name slug');
  
  res.json(layouts);
});

// Fetch Layout Configuration
export const getLayoutConfig = expressAsyncHandler(async (req, res) => {
    const { layoutId } = req.params;  // Assume you're passing layoutId instead of storeId

    const layout = await StoreLayout.findById(layoutId).populate('store', '_id name slug');

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
    const layout = await StoreLayout.findOne({ store: storeId }).populate('store', '_id name slug');

    if (!layout) {
        res.status(404);
        throw new Error("Layout configuration not found for this store.");
    }

    res.json(layout);
});

// Get Layout by Name
export const getLayoutByName = expressAsyncHandler(async (req, res) => {
    const { name } = req.params;

    // Find the layout by name (case-insensitive)
    const layout = await StoreLayout.findOne({ name: new RegExp(`^${name}$`, 'i') }).populate('store', '_id name slug');

    if (!layout) {
        res.status(404);
        throw new Error("Layout not found with this name.");
    }

    res.json(layout);
});

// Get Layout by Store
export const getLayoutByStore = expressAsyncHandler(async (req, res) => {
    const { storeId } = req.params;

    // Find the layout where the store field matches the given storeId
    const layout = await StoreLayout.findOne({ store: storeId }).populate('store', '_id name slug');

    if (!layout) {
        res.status(404);
        throw new Error("Layout configuration not found for this store.");
    }

    res.json(layout);
});

export const getDemoLayouts = expressAsyncHandler(async (req, res) => {
    const { trades } = req.query;

    // Fetch all demo layouts
    const demoLayouts = await StoreLayout.find({ isDemo: true, store: { $ne: null } }).populate('store', '_id name slug trades');

    let filteredLayouts = demoLayouts;

    if (trades) {
        const tradesArray = trades.split(',');
        // Filter layouts where the store has at least one matching trade
        filteredLayouts = demoLayouts.filter(layout => {
            const storeTrades = layout.store?.trades || [];
            return tradesArray.some(trade => storeTrades.includes(trade));
        });
    }

    if (!filteredLayouts || filteredLayouts.length === 0) {
        res.status(404);
        throw new Error("No demo layouts found.");
    }

    res.json(filteredLayouts);
});

// Update Layout Configuration
export const updateLayoutConfig = expressAsyncHandler(async (req, res) => {
  const { layoutId } = req.params;
  const body = req.body;
  const layout = await StoreLayout.findById(layoutId);
  if (!layout) {
    return res.status(404).json({ message: "Layout not found" });
  }
  
  if (body.store) {
    layout.store = body.store;
  };
  if (body.background) {
    layout.background = body.background;
  };

  if (body.floats) {
    layout.floats = body.floats;
  }

  if (body.routes) {
    layout.routes = body.routes;
  }

  if (body.routeOrder) {
    layout.routeOrder = body.routeOrder;
  }

  if (body.name) {
    layout.name = body.name;
  };

  if (body.menubar) {
    layout.menubar = body.menubar;
  };

  if (body.colors) {
    layout.colors = body.colors;
  };

  if (body.fonts) {
    layout.fonts = body.fonts;
  };

  if (body.sections?.footer) {
    layout.sections.footer = body.sections.footer;
  };
  if (body.sections?.about) {
    layout.sections.about = body.sections.about;
  }

  // Example: update sections.hero only if present
  if (body.sections?.hero) {
    layout.sections.hero = body.sections.hero;
  }

  if (body.sections?.products) {
    layout.sections.products = body.sections.products;
  }

  if (body.sections?.FAQs) {
    layout.sections.FAQs = body.sections.FAQs;
  }

  if (body.sections?.searchResults) {
    layout.sections.searchResults = body.sections.searchResults;
  }

  if (body.sections?.contact) {
    layout.sections.contact = body.sections.contact;
  }

  if (body.sections?.reviews) {
    layout.sections.reviews = body.sections.reviews;
  }

  if (body.sections?.gallery) {
    layout.sections.gallery = body.sections.gallery;
  }

  if (body.sections?.singleProduct) {
    layout.sections.singleProduct = body.sections.singleProduct;
  }

  if (body.sections?.services) {
    layout.sections.services = body.sections.services;
  };

  if (body.sections?.bookService) {
    layout.sections.bookService = body.sections.bookService;
  };

  if (body.sections?.rentals) {
    layout.sections.rentals = body.sections.rentals;
  };

  if (body.sections?.donations) {
    layout.sections.donations = body.sections.donations;
  };

  // Example: update layout settings
  if (body.settings) {
    Object.assign(layout.settings, body.settings);
  }

  // Save
  const updatedLayout = await StoreLayout.findByIdAndUpdate(
    layoutId,
    { $set: layout },
    { new: true, runValidators: true }
  );

  res.json({
    message: "Layout updated successfully",
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

// Capture screenshot, upload to GCS, save URL in DB
export const captureLayoutScreenshot = expressAsyncHandler(async (req, res) => {
  const { layoutId } = req.params;

  if (!layoutId) {
    res.status(400);
    throw new Error("Layout ID is required");
  }

  try {
    // 1️⃣ Retrieve existing layout
    const layout = await StoreLayout.findById(layoutId);
    if (!layout) {
      res.status(404);
      throw new Error("Layout not found");
    }

    const oldScreenshotUrl = layout.screenshot;

    // 2️⃣ Delete old screenshot ONLY if it matches this layoutId
    if (oldScreenshotUrl) {
      // Extract the path after the bucket domain
      const urlPath = oldScreenshotUrl.split("the-mall-uploads-giza/")[1] || "";

      // Example urlPath = "store-layouts/abc123/layout-999.png"
      const screenshotLayoutId = urlPath.split("/")[1];  // should equal layoutId

      // Compare folder layout ID
      if (screenshotLayoutId === layoutId) {
        const oldScreenshotFileName = urlPath.split("/").pop();

        console.log("Deleting old screenshot:", urlPath);

        await deleteFromUploads(`store-layouts/${layoutId}/${oldScreenshotFileName}`);
        console.log("🖼️ Old screenshot deleted from GCS.");
      } else {
        console.log("⚠️ Old screenshot belongs to another layout. Not deleting.");
      }
    }

    // 3️⃣ Capture screenshot as Buffer
    const screenshotBuffer = await captureStoreLayoutScreenshot(layoutId);
    if (!screenshotBuffer) {
      res.status(500);
      throw new Error("Failed to capture layout screenshot");
    }

    // 4️⃣ Upload new screenshot
    const fileName = `store-layouts/${layoutId}/layout-${Date.now()}.png`;
    await uploadToUploads(screenshotBuffer, fileName);

    const publicUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${fileName}`;

    // 5️⃣ Update DB
    const updatedLayout = await StoreLayout.findByIdAndUpdate(
      layoutId,
      { screenshot: publicUrl },
      { new: true }
    );

    if (!updatedLayout) {
      res.status(404);
      throw new Error("Layout not found after update");
    }

    res.status(200).json({
      message: "Screenshot captured, uploaded, and saved successfully",
      layout: updatedLayout,
    });

  } catch (error) {
    console.error("❌ Failed to capture and upload layout screenshot:", error);
    res.status(500);
    throw new Error("Failed to capture and upload layout screenshot");
  }
});

