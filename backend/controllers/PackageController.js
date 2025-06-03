import asyncHandler from 'express-async-handler';
import Package from '../models/PackageModel.js';


export const createPackage = asyncHandler(async (req, res) => {
  const {
    store,
    name,
    price,
    description,
    duration,
    isHighlighted,
    label,
    frequency,
    features,
    discountPercentage,
  } = req.body;

  // Basic required fields validation
  if (!store || !name || price == null || !duration) {
    res.status(400);
    throw new Error('Please provide store, name, price, and duration');
  }

  const newPackage = await Package.create({
    store,
    name,
    price,
    description,
    duration,
    isHighlighted,
    label,
    frequency,
    features,
    discountPercentage,
  });

  res.status(201).json(newPackage);
});


export const updatePackage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingPackage = await Package.findById(id);

  if (!existingPackage) {
    res.status(404);
    throw new Error('Package not found');
  }


  const allowedFields = [
    'name',
    'price',
    'description',
    'duration',
    'isHighlighted',
    'label',
    'frequency',
    'features',
    'discountPercentage',
    'isActive',
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      existingPackage[field] = req.body[field];
    }
  });

  const updated = await existingPackage.save();

  res.status(200).json(updated);
});


export const getStorePackages = asyncHandler(async (req, res) => {
  const { storeId } = req.params;

  const packages = await Package.find({ store: storeId, isActive: true }).sort({ createdAt: -1 });

  res.status(200).json(packages);
});


export const deletePackage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const pkg = await Package.findById(id);

  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }


  pkg.isActive = false;
  await pkg.save();

  res.status(200).json({ message: 'Package deleted (soft)', id: pkg._id });
  
});
