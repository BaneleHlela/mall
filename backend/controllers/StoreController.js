import expressAsyncHandler from 'express-async-handler';
import  Store  from '../models/storeModel.js';
import { sendStoreCreatedEmail } from '../emails/email.js';
import { uploadToUploads } from '../config/gcsClient.js';

// add store
export const addStore = expressAsyncHandler(async (req, res) => {
    const { _id, email, firstName } = req.user;

    // Create the store with the creator as the owner in the team
    const created = new Store({
        team: [{ member: _id, role: "owner" }], // Assign the creator as the owner
        ...req.body,
    });

    await created.save();

    await sendStoreCreatedEmail(email, firstName, created.name, `http://localhost:5173/dashboard/${created._id}`)    
    res.status(201).json(created);
});


// get store
export const getStore = expressAsyncHandler(async (req, res) => {
    try {
      const storeId = req.params.storeId;
      const store = await Store.findById(storeId);
  
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }
  
      res.status(200).json(store);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve store', details: error.message });
    }
}); 

// Get all stores or filter by department
// export const getStores = expressAsyncHandler(async (req, res) => {
//   const { department } = req.query;
//   //more query settings

//   let stores;
//   if (department) {
//     stores = await Store.find({ department });
//   } else {
//     stores = await Store.find({});
//   }

//   res.status(200).json(stores);
// });

export const getStores = expressAsyncHandler(async (req, res) => {
  const { search } = req.query;

  const searchFilter = search
    ? { name: { $regex: search.toString(), $options: 'i' } } // case-insensitive partial match
    : {};

  const stores = await Store.find(searchFilter);

  res.status(200).json(stores);
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

export const getStoresByOwner = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;

  // Find stores where the user is part of the team (regardless of their role)
  const stores = await Store.find({ "team.member": _id });

  res.status(200).json(stores);
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

// Upload store logo
export const uploadStoreLogo = expressAsyncHandler(async (req, res) => {
  try {
    const { storeId } = req.params;
    const file = req.file;
    const fileName = req.body.fileName || file.originalname;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Delete old logo if it exists
    if (store.logo && store.logo.url) {
      const oldFilePath = store.logo.url.split(`the-mall-uploads-giza69/`)[1]
      try {
        await uploadsBucket.file(oldFilePath).delete();
        console.log(`Old logo deleted: ${oldFilePath}`);
      } catch (error) {
        console.error(`Error deleting old logo:`, error.message);
      }
    }

    // Upload new logo
    const destination = `stores/${storeId}/logo/${Date.now()}_${fileName}`;
    await uploadToUploads(file.buffer, destination);

    const publicUrl = `https://storage.googleapis.com/the-mall-uploads-giza69/${destination}`;

    // Update store document
    store.logo = { url: publicUrl };
    await store.save();

    res.status(200).json({ message: "Logo uploaded successfully", url: publicUrl });
  } catch (error) {
    console.error("Upload logo error:", error);
    res.status(500).json({ message: "Failed to upload logo" });
  }
});


export const deleteStoreLogo = expressAsyncHandler(async (req, res) => {
  try {
    const { storeId } = req.params;

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    if (store.logo && store.logo.url) {
      const oldFilePath = store.logo.url.split(`the-mall-uploads-giza69/`)[1]; // Important: split correctly
      try {
        await uploadsBucket.file(oldFilePath).delete();
        console.log(`Old logo deleted: ${oldFilePath}`);
      } catch (error) {
        console.error(`Error deleting logo:`, error.message);
      }
    }

    // Clear logo fields
    store.logo = { url: "" };
    await store.save();

    res.status(200).json({ message: "Logo deleted successfully", storeId: store._id });
  } catch (error) {
    console.error("Delete logo error:", error);
    res.status(500).json({ message: "Failed to delete logo" });
  }
});
