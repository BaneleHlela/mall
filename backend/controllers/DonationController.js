import Donation from '../models/DonationModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { uploadToUploads, deleteFromUploads } from '../config/gcsClient.js';


export const createDonation = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    isActive,
    tags,
    store,
  } = req.body;


  const files = req.files; // array of images

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'At least one donation image is required.' });
  }

  // Create slug: <slug-name>-<Date.now>
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 100);

  const timestamp = Date.now();
  const slug = `${baseSlug}-${timestamp}`;

  // Parse form-data fields if needed
  const parsedTags = Array.isArray(tags)
    ? tags
    : tags
    ? JSON.parse(tags)
    : [];

  const imageUrls = [];

  for (const file of files) {
    const imageFileName = `${Date.now()}-${file.originalname}`;
    const imagePath = `stores/${store}/donations/${slug}/${imageFileName}`;

    await uploadToUploads(file.buffer, imagePath);

    const imageUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${imagePath}`;
    imageUrls.push(imageUrl);
  }

  console.log("creating donation")

  const donation = await Donation.create({
    name,
    description,
    images: imageUrls,
    isActive,
    tags: parsedTags,
    slug,
    store: new mongoose.Types.ObjectId(store),
  });

  res.status(201).json(donation);
});



// Update donation
export const updateDonation = asyncHandler(async (req, res) => {
  let {
    name,
    description,
    isActive,
    tags,
    store,
    imageUrls: retainedImages = [],
  } = req.body;


  const files = req.files; // newly uploaded images


  // 🧩 Parse JSON fields if they came in as strings
  try {
    if (typeof tags === "string") tags = JSON.parse(tags);
    if (typeof retainedImages === "string") retainedImages = JSON.parse(retainedImages);
  } catch (err) {
    console.error("Error parsing donation fields:", err);
    return res.status(400).json({ message: "Invalid JSON format in request body." });
  }

  // ✅ Validation
  if (!isActive && (!files || files.length === 0) && retainedImages.length === 0) {
    return res.status(400).json({ message: "At least one donation image is required." });
  }

  // ✅ Find existing donation
  const donationId = req.params.id;
  const donation = await Donation.findById(donationId);
  if (!donation) {
    return res.status(404).json({ message: "Donation not found." });
  }

  // 1️⃣ Identify images to delete
  const oldImages = donation.images || [];
  const removedImages = oldImages.filter((url) => !retainedImages.includes(url));

  // 2️⃣ Delete removed images from Google Cloud Storage
  for (const imageUrl of removedImages) {
    try {
      const path = imageUrl.split("the-mall-uploads-giza/")[1];
      if (path) {
        await deleteFromUploads(path);
        console.log(`🗑️ Deleted from GCS: ${path}`);
      }
    } catch (err) {
      console.error(`⚠️ Failed to delete image: ${imageUrl}`, err.message);
    }
  }

  // 3️⃣ Upload new images (if any)
  const newImageUrls = [];
  if (files && files.length > 0) {
    for (const file of files) {
      const imageFileName = `${Date.now()}-${file.originalname}`;
      const imagePath = `stores/${store}/donations/${donation.slug}/${imageFileName}`;
      await uploadToUploads(file.buffer, imagePath);
      const imageUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${imagePath}`;
      newImageUrls.push(imageUrl);
    }
  }

  // 4️⃣ Merge remaining and new images
  const updatedImages = [...retainedImages, ...newImageUrls];

  // 5️⃣ Prepare updated donation data
  const updatedDonationData = {
    name: name || donation.name,
    description: description || donation.description,
    isActive: isActive ?? donation.isActive,
    tags: tags || donation.tags,
    images: updatedImages,
  };

  // 6️⃣ Save updated donation
  const updatedDonation = await Donation.findByIdAndUpdate(donationId, updatedDonationData, { new: true });
  if (!updatedDonation) {
    return res.status(500).json({ message: "Failed to update donation." });
  }

  res.status(200).json(updatedDonation);
});

// Get donation by ID
export const getDonationById = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  if (!donation) throw new Error('Donation not found');
  res.status(200).json(donation);
});

// Get store donations by storeSlug
export const getStoreDonations = asyncHandler(async (req, res) => {
  const { storeSlug } = req.params;

  // Check if storeSlug is a valid ObjectId or a slug
  let query = {};
  if (mongoose.Types.ObjectId.isValid(storeSlug)) {
    // If it's a valid ObjectId, use it directly
    query = { store: new mongoose.Types.ObjectId(storeSlug) };
  } else {
    // If it's not a valid ObjectId, assume it's a slug and find the store by slug
    const Store = (await import('../models/StoreModel.js')).default;
    const store = await Store.findOne({ slug: storeSlug });
    if (!store) {
      res.status(404);
      throw new Error("Store not found");
    }
    query = { store: store._id };
  }

  console.log(query);
  try {
    // Fetch donations based on the query
    const donations = await Donation.find(query);

    res.status(200).json(donations);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to fetch store donations");
  }
});

// Get donation by slug
export const getDonationBySlug = asyncHandler(async (req, res) => {
  const donation = await Donation.findOne({ slug: req.params.slug }).populate('store');
  if (!donation) throw new Error('Donation not found');
  res.status(200).json(donation);
});

// Delete donation and its images from Google Cloud
export const deleteDonation = asyncHandler(async (req, res) => {
  const donationId = req.params.id;

  // 1️⃣ Find donation first
  const donation = await Donation.findById(donationId);
  if (!donation) {
    return res.status(404).json({ message: "Donation not found." });
  }

  // 2️⃣ Delete all images from Google Cloud Storage
  const images = donation.images || [];
  for (const imageUrl of images) {
    try {
      const path = imageUrl.split("the-mall-uploads-giza/")[1];
      if (path) {
        await deleteFromUploads(path);
        console.log(`🗑️ Deleted from GCS: ${path}`);
      }
    } catch (err) {
      console.error(`⚠️ Failed to delete image: ${imageUrl}`, err.message);
    }
  }

  // 3️⃣ Delete the donation document from MongoDB
  const removed = await Donation.findByIdAndDelete(donationId);
  if (!removed) {
    return res.status(500).json({ message: "Failed to delete donation." });
  }

  res.status(200).json({ message: "Donation and its images deleted successfully." });
});

export const getAllDonations = asyncHandler(async (req, res) => {
  const { store, search, page = 1, limit = 20 } = req.query;

  const query = {};

  if (store) query.store = store;

  if (search) {
    query.name = { $regex: search, $options: 'i' }; // case-insensitive search
  }

  const skip = (page - 1) * limit;

  const donations = await Donation.find(query)
    .populate('store', 'name') // optionally populate store name
    .sort({ createdAt: -1 }) // newest first
    .skip(skip)
    .limit(Number(limit));

  const total = await Donation.countDocuments(query);

  res.status(200).json({
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    count: donations.length,
    donations,
  });
});


export const updateIsActive = asyncHandler(async (req, res) => {
  const { donationId } = req.params;
  const { isActive } = req.body;

  // Validate input
  if (typeof isActive !== 'boolean') {
    res.status(400);
    throw new Error('isActive must be a boolean value.');
  }

  // Find donation
  const donation = await Donation.findById(donationId);
  if (!donation) {
    res.status(404);
    throw new Error('Donation not found.');
  }

  // Update and save
  donation.isActive = isActive;
  const updatedDonation = await donation.save();

  res.status(200).json({
    message: 'Donation status updated successfully.',
    donation: updatedDonation,
  });
});
