import Service from '../models/ServiceModel.js';

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
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !duration || !store) {
      return res.status(400).json({ message: 'Missing required fields' });
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
    const { id } = req.params;

    // Find the service by ID
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Update fields from request body
    const {
      name,
      description,
      price,
      duration,
      store,
      thumbnail,
      images,
      category,
    } = req.body;

    // Only update if provided
    if (name) service.name = name;
    if (description) service.description = description;
    if (price) service.price = price;
    if (duration) service.duration = duration;
    if (store) service.store = store;
    if (thumbnail) service.thumbnail = thumbnail;
    if (images) service.images = images;
    if (category) service.category = category;

    await service.save();

    res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getStoreServices = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    if (!storeId) {
      return res.status(400).json({ message: 'Store ID is required' });
    }

    const services = await Service.find({ store: storeId }).sort({ createdAt: -1 });

    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching store services:', error);
    res.status(500).json({ message: 'Server error while fetching store services' });
  }
};


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

