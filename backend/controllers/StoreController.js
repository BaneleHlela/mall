import expressAsyncHandler from 'express-async-handler';
import  Store  from '../models/StoreModel.js';
import { sendStoreCreatedEmail } from '../emails/email.js';
import { uploadToUploads, uploadsBucket } from '../config/gcsClient.js';

// add store
export const addStore = expressAsyncHandler(async (req, res) => {
    //const { _id, email, firstName } = req.user;
  console.log(req.body,)
    // Create the store with the creator as the owner in the team
    const created = new Store({
        //team: [{ member: _id, role: "owner" }], // Assign the creator as the owner
        ...req.body,
    });

    await created.save();

    // await sendStoreCreatedEmail(email, firstName, created.name, `http://localhost:5173/dashboard/${created._id}`)    
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

  console.log(req.body.locations )

  const store = await Store.findById(storeId);

  if (!store) {
    res.status(404);
    throw new Error("Store not found");
  }

  // Merge locations
  if (req.body.locations && Array.isArray(req.body.locations) && req.body.locations.length > 0) {
    const newLocation = req.body.locations[0];
    if (newLocation.lat && newLocation.lng && newLocation.address) {
      store.locations = [{
        nickname: newLocation.nickname || '',
        lat: newLocation.lat,
        lng: newLocation.lng,
        address: newLocation.address,
      }];
    } else {
      console.log('Invalid location data provided');
    }
  } else {
    console.log('No valid locations provided');
  }

  // Update socials
  if (req.body.socials && Array.isArray(req.body.socials)) {
    store.socials = req.body.socials.filter((social) => {
      return (
        social.platform &&
        ['facebook', 'twitter', 'instagram', 'linkedin', 'pinterest', 'youtube', 'whatsapp', 'phone'].includes(social.platform) &&
        social.url
      );
    });
  }

  // Update categories
  if (req.body.categories) {
    if (req.body.categories.products && Array.isArray(req.body.categories.products)) {
      store.categories.products = req.body.categories.products; // Update products
    }
    if (req.body.categories.services && Array.isArray(req.body.categories.services)) {
      store.categories.services = req.body.categories.services; // Update services
    }
  }

  // Update contact details
  if (req.body.contact) {
    store.contact = store.contact || {}; // Ensure contact object exists
    if (req.body.contact.phone) {
        store.contact.phone = req.body.contact.phone;
    }

    if (req.body.contact.email) {
      // You might want to add an email validation regex here
      store.contact.email = req.body.contact.email;
    }

    if (req.body.contact.whatsapp) {
      if (/^\+?[1-9]\d{1,14}$/.test(req.body.contact.whatsapp)) {
        store.contact.whatsapp = req.body.contact.whatsapp;
      } else {
        console.log('Invalid WhatsApp number provided');
      }
    }
  }

  // Update OperationTimes
  if (req.body.operationTimes) {
    store.operationTimes = req.body.operationTimes;
  }

  // Save the updated store
  await store.save();

  // const updatedStore = await Store.findById(storeId).populate("layouts");

  res.status(200).json(store);
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
      const oldFilePath = store.logo.url.split(`the-mall-uploads-giza/`)[1]
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

    const publicUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${destination}`;

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
      const oldFilePath = store.logo.url.split(`the-mall-uploads-giza/`)[1]; // Important: split correctly
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


export const getStoreImages = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;  // determines how many images to skip before selecting results

  const store = await Store.findById(storeId).select('images');

  if (!store) return res.status(404).send({ error: 'Store not found' });

  const paginatedImages = store.images.slice(skip, skip + limit);
  const hasMore = store.images.length > skip + limit;

  res.send({
    images: paginatedImages,
    hasMore,
  });
});

// Upload store gallery image
export const uploadStoreGalleryImage = expressAsyncHandler(async (req, res) => {
  try {
    const { storeId } = req.params;
    const { description } = req.body;
    const file = req.file;
    const fileName = req.body.fileName || file.originalname;


    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Upload new image to the bucket
    const destination = `stores/${storeId}/images/${fileName}`;
    await uploadToUploads(file.buffer, destination);

    const publicUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${destination}`;

    // Add new image entry to store.images
    store.images.push({
      url: publicUrl,
      description: description || '',
    });

    await store.save();

    res.status(200).json({
      message: "Image uploaded successfully",
      url: publicUrl,
      description,
    });
  } catch (error) {
    console.error("Upload gallery image error:", error);
    res.status(500).json({ message: "Failed to upload gallery image" });
  }
});

// Delete store gallery image
export const deleteStoreGalleryImage = expressAsyncHandler(async (req, res) => {
  try {
    const { storeId } = req.params;
    const { imageUrl } = req.body;


    if (!imageUrl) {
      return res.status(400).json({ message: "Missing image URL" });
    }

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Find the image in the array
    const imageIndex = store.images.findIndex(img => img.url === imageUrl);
    if (imageIndex === -1) {
      return res.status(404).json({ message: "Image not found in store gallery" });
    }

    // Delete from GCS
    const filePath = imageUrl.split(`the-mall-uploads-giza/`)[1];
    try {
      await uploadsBucket.file(filePath).delete();
      console.log(`Image deleted from GCS: ${filePath}`);
    } catch (error) {
      console.error("Error deleting image from GCS:", error.message);
      return res.status(500).json({ message: "Failed to delete image from storage" });
    }

    // Remove from store.images
    store.images.splice(imageIndex, 1);
    await store.save();

    res.status(200).json({ message: "Gallery image deleted successfully" });
  } catch (error) {
    console.error("Delete gallery image error:", error);
    res.status(500).json({ message: "Failed to delete gallery image" });
  }
});

