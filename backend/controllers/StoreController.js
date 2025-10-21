import expressAsyncHandler from 'express-async-handler';
import  Store  from '../models/StoreModel.js';
import { uploadToUploads, uploadsBucket } from '../config/gcsClient.js';
import mongoose from 'mongoose';
import User from '../models/UserModel.js';

const CLIENT_URL = process.env.CLIENT_URL;

// add store
export const addStore = expressAsyncHandler(async (req, res) => {
    //const { _id, email, firstName } = req.user;
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



export const getStores = expressAsyncHandler(async (req, res) => {
  const { search, department, sortBy, userLat, userLng } = req.query;

  let searchFilter = {};
  
  if (search) {
    searchFilter = {
      $or: [
        { name: { $regex: search.toString(), $options: 'i' } },
        { slogan: { $regex: search.toString(), $options: 'i' } },
        { about: { $regex: search.toString(), $options: 'i' } },
        { 'categories.products': { $in: [new RegExp(search.toString(), 'i')] } },
        { 'categories.services': { $in: [new RegExp(search.toString(), 'i')] } }
      ]
    };
  }

  if (department) {
    searchFilter = {
      ...searchFilter,
      departments: department
    };
  }

  let stores;

  // Handle sorting
  if (sortBy === 'nearest' && userLat && userLng) {
    // ✅ requires location as a 2dsphere index
    stores = await Store.find({
      ...searchFilter,
      'location.lat': { $exists: true },
      'location.lng': { $exists: true },
    }).aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(userLng), parseFloat(userLat)],
          },
          distanceField: 'distance',
          spherical: true,
        },
      },
    ]);
  } else {
    let sortOption = { createdAt: -1 }; // default newest first

    switch (sortBy) {
      case 'top-rated':
        sortOption = { 'rating.averageRating': -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'most-liked':
        sortOption = { 'likes.count': -1 };
        break;
    }

    stores = await Store.find(searchFilter).sort(sortOption);
  }

  res.status(200).json(stores);
});

// Get demo stores
export const getDemoStores = expressAsyncHandler(async (req, res) => {
  try {
    const stores = await Store.find({ isDemo: true });

    if (!stores || stores.length === 0) {
      return res.status(404).json({ message: 'No demo stores found' });
    }

    res.status(200).json(stores);
  } catch (error) {
    console.error('Error fetching demo stores:', error);
    res.status(500).json({ message: 'Server error while fetching demo stores' });
  }
})

// Edit store information
export const editStore = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  console.log(req.body.locations )

  const store = await Store.findById(storeId);

  if (!store) {
    res.status(404);
    throw new Error("Store not found");
  }
  // Update store name
  if (req.body.name) {
    store.name = req.body.name;
  }

  // Update store slogan
  if (req.body.slogan !== undefined) {
    store.slogan = req.body.slogan;
  }

  // Update store trade options
  if (req.body.trades && Array.isArray(req.body.trades)) {
    store.trades = req.body.trades;
  }

  // Update Store Location
  if (req.body.location) {
    store.location = req.body.location;
  }

  // Update store about
  if (req.body.about) {
    store.about = req.body.about;
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


export const addTeamMember = expressAsyncHandler(async (req, res) => {
  const { username, role, about } = req.body;
  const { storeId } = req.params;


  // Validate input
  if (!username) {
    return res.status(400).json({ message: 'Username is required.' });
  }

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const store = await Store.findById(storeId);
  if (!store) {
    return res.status(404).json({ message: 'Store not found.' });
  }

  // Check if user is already on the team
  const alreadyExists = store.team.some((member) =>
    member.member.toString() === user._id.toString()
  );
  if (alreadyExists) {
    return res.status(400).json({ message: 'User is already a team member.' });
  }

  // Handle image upload
  const file = req.file;
  let imageUrl = '';
  if (file) {
    const imageFileName = `${Date.now()}-${file.originalname}`;
    const imagePath = `stores/${storeId}/team/${imageFileName}`;
    await uploadToUploads(file.buffer, imagePath);
    imageUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${imagePath}`;
  }

  const newTeamMember = {
    member: user._id,
    username: user.username,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    role: role || 'owner',
    about: about || '',
    image: imageUrl,
  };

  store.team.push(newTeamMember);
  await store.save();

  res.status(201).json(store);
});


export const deleteTeamMember = expressAsyncHandler(async (req, res) => {
  const { storeId, username } = req.params;

  // Find the store
  const store = await Store.findById(storeId);
  if (!store) {
    return res.status(404).json({ message: 'Store not found.' });
  }

  // Check if the user exists in the team
  const memberIndex = store.team.findIndex(
    (member) => member.username === username
  );

  if (memberIndex === -1) {
    return res.status(404).json({ message: 'Team member not found.' });
  }

  // Ensure at least one member remains
  if (store.team.length <= 1) {
    return res.status(400).json({
      message: 'Cannot delete the last team member. A store must have at least one team member.',
    });
  }

  // Remove the team member
  store.team.splice(memberIndex, 1);
  await store.save();

  res.status(200).json({
    message: 'Team member removed successfully.',
    store,
  });
});


export const editTeamMember = expressAsyncHandler(async (req, res) => {
  const { storeId, username } = req.params;
  const { name, position, about } = req.body;

  // Find the store
  const store = await Store.findById(storeId);
  if (!store) {
    return res.status(404).json({ message: 'Store not found.' });
  }

  // Find the team member
  const member = store.team.find((m) => m.username === username);
  if (!member) {
    return res.status(404).json({ message: 'Team member not found.' });
  }

  // Update fields
  if (name) member.name = name;
  if (position) member.position = position;
  if (about) member.about = about;

  // Handle image upload
  const file = req.file;
  if (file) {
    const imageFileName = `${Date.now()}-${file.originalname}`;
    const imagePath = `stores/${storeId}/team/${imageFileName}`;
    await uploadToUploads(file.buffer, imagePath);
    member.image = `https://storage.googleapis.com/the-mall-uploads-giza/${imagePath}`;
  }

  await store.save();

  res.status(200).json({
    message: 'Team member updated successfully.',
    store,
  });
});
