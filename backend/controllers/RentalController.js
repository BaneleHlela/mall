import Rental from '../models/RentalModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { uploadToUploads, deleteFromUploads } from '../config/gcsClient.js';

export const createRental = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      duration,
      store,
      category,
    } = req.body;

    const files = req.files; // array of images

    // Validate required fields
    if (!name || !description || !duration || !store || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Parse price if it's a string
    let parsedPrice = price;
    if (typeof price === 'string') {
      try {
        parsedPrice = JSON.parse(price);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid price format' });
      }
    }

    // Parse duration if it's a string
    let parsedDuration = duration;
    if (typeof duration === 'string') {
      try {
        parsedDuration = JSON.parse(duration);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid duration format' });
      }
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

    const imageUrls = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const imageFileName = `${Date.now()}-${file.originalname}`;
        const imagePath = `stores/${store}/rentals/${slug}/${imageFileName}`;

        await uploadToUploads(file.buffer, imagePath);

        const imageUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${imagePath}`;
        imageUrls.push(imageUrl);
      }
    }

    const rental = new Rental({
      name,
      description,
      price: parsedPrice,
      duration: parsedDuration,
      store,
      images: imageUrls,
      category,
      slug,
    });

    await rental.save();

    res.status(201).json(rental);
  } catch (error) {
    console.error('Error creating rental:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateRental = async (req, res) => {
  try {
    const rentalId = req.params.id;
    const {
      name,
      description,
      price,
      duration,
      store,
      category,
      imageUrls: retainedImages = [],
    } = req.body;

    const files = req.files; // newly uploaded images

    // Parse JSON fields if needed
    let parsedRetainedImages = retainedImages;
    if (typeof retainedImages === "string") {
      parsedRetainedImages = JSON.parse(retainedImages);
    }

    // Parse price if it's a string
    let parsedPrice = price;
    if (typeof price === 'string') {
      try {
        parsedPrice = JSON.parse(price);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid price format' });
      }
    }

    // Parse duration if it's a string
    let parsedDuration = duration;
    if (typeof duration === 'string') {
      try {
        parsedDuration = JSON.parse(duration);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid duration format' });
      }
    }

    // Find the rental by ID
    const rental = await Rental.findById(rentalId);

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    // 1️⃣ Identify images to delete
    const oldImages = rental.images || [];
    const removedImages = oldImages.filter((url) => !parsedRetainedImages.includes(url));

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
        const imagePath = `stores/${rental.store}/rentals/${rental.slug}/${imageFileName}`;
        await uploadToUploads(file.buffer, imagePath);
        const imageUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${imagePath}`;
        newImageUrls.push(imageUrl);
      }
    }



    // 4️⃣ Merge remaining and new images
    const updatedImages = [...parsedRetainedImages, ...newImageUrls];

    // Update fields if provided
    if (name) rental.name = name;
    if (description) rental.description = description;
    if (parsedPrice !== undefined) rental.price = parsedPrice;
    if (parsedDuration) rental.duration = parsedDuration;
    if (store) rental.store = store;
    rental.images = updatedImages;
    if (category) rental.category = category;
    if (req.body.isActive !== undefined) rental.isActive = req.body.isActive;

    await rental.save();
    console.log(rental)

    res.status(200).json(rental);
  } catch (error) {
    console.error('Error updating rental:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRentalById = async (req, res) => {
  try {
    const { id } = req.params;

    const rental = await Rental.findById(id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    res.status(200).json(rental);
  } catch (error) {
    console.error('Error fetching rental by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStoreRentals = asyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { category } = req.query;

  // Check if storeId is a valid ObjectId or a slug
  let query = {};
  if (mongoose.Types.ObjectId.isValid(storeId)) {
    // If it's a valid ObjectId, use it directly
    query = { store: new mongoose.Types.ObjectId(storeId) };
  } else {
    // If it's not a valid ObjectId, assume it's a slug and find the store by slug
    const Store = (await import('../models/StoreModel.js')).default;
    const store = await Store.findOne({ slug: storeId });
    if (!store) {
      res.status(404);
      throw new Error("Store not found");
    }
    query = { store: store._id };
  }

  if (category) {
    query.category = category;
  }

  try {
    const rentals = await Rental.find(query).sort({ createdAt: -1 });
    res.status(200).json(rentals);
  } catch (error) {
    console.error('Error fetching store rentals:', error);
    res.status(500);
    throw new Error('Failed to fetch store rentals');
  }
});


export const getRentalBySlug = asyncHandler(async (req, res) => {
  const rental = await Rental.findOne({ slug: req.params.slug });
  if (!rental) throw new Error('Rental not found');
  res.status(200).json(rental);
});

export const deleteRental = async (req, res) => {
  try {
    const { id } = req.params;

    const rental = await Rental.findById(id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    // 2️⃣ Delete all images from Google Cloud Storage
    const images = rental.images || [];
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

    await rental.deleteOne(); // or rental.remove()

    res.status(200).json({ message: 'Rental deleted successfully' });
  } catch (error) {
    console.error('Error deleting rental:', error);
    res.status(500).json({ message: 'Server error' });
  }
};