import Service from '../models/ServiceModel.js';
import asyncHandler from 'express-async-handler'; 
import mongoose from 'mongoose';

export const createService = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      duration,
      store,
      thumbnail,
      images,
      category,
      performers, // Added performers
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !duration || !store) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate performers if provided
    if (performers && !Array.isArray(performers)) {
      return res.status(400).json({ message: 'Performers must be an array' });
    }

    if (performers) {
      for (const performer of performers) {
        if (!performer.user || !performer.name) {
          return res.status(400).json({
            message: 'Each performer must have a user (ObjectId) and a name',
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

    const service = new Service({
      name,
      description,
      price,
      duration,
      store,
      thumbnail,
      images,
      category,
      slug,
      performers, // Include performers in the service object
    });

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
      thumbnail,
      images,
      category,
      performers, // Added performers
    } = req.body;

    // Find the service by ID
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Update fields if provided
    if (name) service.name = name;
    if (description) service.description = description;
    if (price) service.price = price;
    if (duration) service.duration = duration;
    if (store) service.store = store;
    if (thumbnail) service.thumbnail = thumbnail;
    if (images) service.images = images;
    if (category) service.category = category;
    if (req.body.isActive !== undefined) service.isActive = req.body.isActive;

    // Validate and update performers if provided
    if (performers) {
      if (!Array.isArray(performers)) {
        return res.status(400).json({ message: 'Performers must be an array' });
      }

      for (const performer of performers) {
        if (!performer.user || !performer.name) {
          return res.status(400).json({
            message: 'Each performer must have a user (ObjectId) and a name',
          });
        }
      }

      service.performers = performers; // Update performers
    }

    await service.save();

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
    const services = await Service.find(query).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching store services:', error);
    res.status(500);
    throw new Error('Failed to fetch store services');
  }
});


export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug }).populate('store');
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

    await service.deleteOne(); // or service.remove()

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

