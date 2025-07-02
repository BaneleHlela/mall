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

    const service = new Service({
      name,
      description,
      price,
      duration,
      store,
      thumbnail,
      images,
      category,
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


export const getStoreServices = asyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { category } = req.query;

  // Validate storeId
  if (!storeId || !mongoose.Types.ObjectId.isValid(storeId)) {
    res.status(400);
    throw new Error("Invalid Store ID");
  }

  // Convert storeId to ObjectId
  const storeObjectId = new mongoose.Types.ObjectId(storeId);

  // Build query
  const query = { store: storeObjectId };
  if (category) {
    query.category = category;
  }

  console.log('Service query:', query);

  try {
    const services = await Service.find(query).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching store services:', error);
    res.status(500);
    throw new Error('Failed to fetch store services');
  }
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

