import expressAsyncHandler from "express-async-handler";
import StoreLayout from "../models/StoreLayout.js";
import Store from "../models/StoreModel.js";

// Fetch layouts by storeId
export const getLayoutsByStore = expressAsyncHandler(async (req, res) => {
    const { storeId } = req.params;
  
    const layouts = await StoreLayout.find({ store: storeId });
  
    if (!layouts || layouts.length === 0) {
      res.status(404);
      throw new Error("No layouts found for the given store.");
    }
  
    res.json(layouts);
});

// Edit store information
export const editStore = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  const store = await Store.findById(storeId);

  if (!store) {
    res.status(404);
    throw new Error("Store not found");
  }

  // Update the store with the entire body of the request
  await Store.findByIdAndUpdate(storeId, req.body, { new: true });

  // Find the updated store and populate the layouts field
  const updatedStore = await Store.findById(storeId).populate('layouts');

  res.status(200).json(updatedStore);
});
  

// Delete a store
export const deleteStore = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  const deletedStore = await Store.findByIdAndDelete(storeId);

  if (deletedStore) {
    res.json({ message: 'Store deleted successfully.' });
  } else {
    res.status(404).json({ message: 'Store not found.' });
  }
});

// link layouts to store
export const linkLayoutToStore = async (req, res) => {
  try {
      const { storeId } = req.params;
      const { layoutId } = req.body; // Layout ID to be added
    console.log(layoutId)
      if (!layoutId) {
          return res.status(400).json({ message: "Layout ID is required." });
      }

      // Find the store and update the layouts array
      const store = await Store.findById(storeId);

      if (!store) {
          return res.status(404).json({ message: "Store not found." });
      }

      // Check if the layout is already linked
      if (store.layouts.includes(layoutId)) {
          return res.status(400).json({ message: "Layout is already linked to this store." });
      }

      // Add the layout to the layouts array
      store.layouts.push(layoutId);
      await store.save();

      res.status(200).json({ message: "Layout linked successfully.", store });
  } catch (error) {
      console.error("Error linking layout to store:", error);
      res.status(500).json({ message: "Server error." });
  }
};