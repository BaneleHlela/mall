import Service from '../models/ServiceModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { uploadToUploads, deleteFromUploads } from '../config/gcsClient.js';

export const createService = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      duration,
      store,
      category,
      performers,
    } = req.body;

    const files = req.files; // array of images

    // Parse performers if it's a string
    let parsedPerformers = performers;
    if (typeof performers === 'string') {
      try {
        parsedPerformers = JSON.parse(performers);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid performers format' });
      }
    }

    // Validate required fields
    if (!name || !description || !duration || !store) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate performers if provided
    if (parsedPerformers && !Array.isArray(parsedPerformers)) {
      return res.status(400).json({ message: 'Performers must be an array' });
    }

    if (parsedPerformers) {
      for (const performer of parsedPerformers) {
        if (!mongoose.Types.ObjectId.isValid(performer)) {
          return res.status(400).json({
            message: 'Each performer must be a valid ObjectId',
          });
        }
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
        const imagePath = `stores/${store}/services/${slug}/${imageFileName}`;

        await uploadToUploads(file.buffer, imagePath);

        const imageUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${imagePath}`;
        imageUrls.push(imageUrl);
      }
    }

    const service = new Service({
      name,
      description,
      price,
      duration,
      store,
      images: imageUrls,
      category,
      slug,
      performers: parsedPerformers,
    });

    // If performers is empty, push the store owner as performer
    if (!service.performers || service.performers.length === 0) {
      const Store = (await import('../models/StoreModel.js')).default;
      const storeDoc = await Store.findById(store);
      if (storeDoc && storeDoc.team && storeDoc.team.length > 0) {
        // Assuming the first team member is the owner or find by role
        const owner = storeDoc.team.find(member => member.role === 'owner');
        if (owner && owner.member) {
          service.performers = [owner.member];
        }
      }
    }

    await service.save();

    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const {
      name,
      description,
      price,
      duration,
      store,
      category,
      performers,
      imageUrls: retainedImages = [],
    } = req.body;

    const files = req.files; // newly uploaded images

    // Parse JSON fields if needed
    let parsedRetainedImages = retainedImages;
    if (typeof retainedImages === "string") {
      parsedRetainedImages = JSON.parse(retainedImages);
    }

    // Parse performers if it's a string
    let parsedPerformers = performers;
    if (typeof performers === 'string') {
      try {
        parsedPerformers = JSON.parse(performers);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid performers format' });
      }
    }

    // Find the service by ID
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // 1️⃣ Identify images to delete
    const oldImages = service.images || [];
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
        const imagePath = `stores/${service.store}/services/${service.slug}/${imageFileName}`;
        await uploadToUploads(file.buffer, imagePath);
        const imageUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${imagePath}`;
        newImageUrls.push(imageUrl);
      }
    }

    

    // 4️⃣ Merge remaining and new images
    const updatedImages = [...parsedRetainedImages, ...newImageUrls];

    // Update fields if provided
    if (name) service.name = name;
    if (description) service.description = description;
    if (price !== undefined) service.price = price;
    if (duration) service.duration = duration;
    if (store) service.store = store;
    service.images = updatedImages;
    if (category) service.category = category;
    if (req.body.isActive !== undefined) service.isActive = req.body.isActive;
    // Validate and update performers if provided
    if (parsedPerformers) {
      if (!Array.isArray(parsedPerformers)) {
        return res.status(400).json({ message: 'Performers must be an array' });
      }

      for (const performer of parsedPerformers) {
        if (!mongoose.Types.ObjectId.isValid(performer)) {
          return res.status(400).json({
            message: 'Each performer must be a valid ObjectId',
          });
        }
      }

      service.performers = parsedPerformers; // Update performers
    }
    // If performers is empty, push the store owner as performer
    if (!service.performers || service.performers.length === 0) {
      const Store = (await import('../models/StoreModel.js')).default;
      const storeDoc = await Store.findById(service.store);
      if (storeDoc && storeDoc.team && storeDoc.team.length > 0) {
        const owner = storeDoc.team.find(member => member.role === 'owner');
        if (owner && owner.member) {
          service.performers = [owner.member];
        }
      }
    }
    await service.save();
    console.log(service)

    res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStoreServices = asyncHandler(async (req, res) => {
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
    const services = await Service.find(query).sort({ createdAt: -1 }).populate('performers', "firstName lastName _id");
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching store services:', error);
    res.status(500);
    throw new Error('Failed to fetch store services');
  }
});


export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug }).populate('performers', "firstName lastName _id");;
  if (!service) throw new Error('Service not found');
  res.status(200).json(service);
});

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // 2️⃣ Delete all images from Google Cloud Storage
    const images = service.images || [];
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

    await service.deleteOne(); // or service.remove()

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

