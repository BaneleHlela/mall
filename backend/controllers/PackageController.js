import asyncHandler from 'express-async-handler';
import Package from '../models/PackageModel.js';
import UserPackage from '../models/UserPackage.js';
import Store from '../models/StoreModel.js';
import mongoose from 'mongoose';


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
    sessions,
    features,
    discountPercentage,
  } = req.body;

  // Basic required fields validation
  if (!store || !name || price == null || !duration || !sessions?.amount || !sessions?.duration) {
    res.status(400);
    throw new Error('Please provide store, name, price, duration, sessions amount and duration');
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
    sessions,
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
    'sessions',
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
  const { storeSlug } = req.params;
  console.log(storeSlug);
  
  // Check if storeSlug is a valid ObjectId or a slug
  let query = {};
  if (mongoose.Types.ObjectId.isValid(storeSlug)) {
    // If it's a valid ObjectId, use it directly
    query = { store: new mongoose.Types.ObjectId(storeSlug) };
  } else {
    // If it's not a valid ObjectId, assume it's a slug and find the store by slug
    const store = await Store.findOne({ slug: storeSlug });
    if (!store) {
      res.status(404);
      throw new Error("Store not found");
    }
    query = { store: store._id };
  }

  console.log(query);
  try {
    // Fetch packages based on the query
    const packages = await Package.find(query);

    res.status(200).json(packages);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to fetch store packages");
  }
});


export const softDeletePackage = asyncHandler(async (req, res) => {
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


export const deletePackage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const pkg = await Package.findById(id);

  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }

  await pkg.deleteOne();

  res.status(200).json({ message: 'Package permanently deleted', id: pkg._id });
});


export const getPackageById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const pkg = await Package.findById(id).populate('store', 'name'); // Optional: populate store name

  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }

  res.status(200).json(pkg);
});


export const getAllPackages = asyncHandler(async (req, res) => {
  const packages = await Package.find().populate('store', 'name');

  res.status(200).json(packages);
});


export const purchasePackage = asyncHandler(async (req, res) => {
  const { packageId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    res.status(401);
    throw new Error('User not authenticated');
  }

  const pkg = await Package.findById(packageId).populate('store');
  
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }

  // Calculate expiry date based on package duration
  const expiryDate = new Date();
  if (pkg.duration.format === 'days') {
    expiryDate.setDate(expiryDate.getDate() + pkg.duration.count);
  } else if (pkg.duration.format === 'weeks') {
    expiryDate.setDate(expiryDate.getDate() + (pkg.duration.count * 7));
  } else if (pkg.duration.format === 'months') {
    expiryDate.setMonth(expiryDate.getMonth() + pkg.duration.count);
  } else if (pkg.duration.format === 'years') {
    expiryDate.setFullYear(expiryDate.getFullYear() + pkg.duration.count);
  }

  const userPackage = await UserPackage.create({
    user: userId,
    package: packageId,
    store: pkg.store._id,
    sessionsTotal: pkg.sessions?.amount || pkg.sessions,
    sessionsRemaining: pkg.sessions?.amount || pkg.sessions,
    expiryDate,
    pricePaid: pkg.price,
  });

  res.status(201).json(userPackage);
});

export const updateUserPackageSessions = asyncHandler(async (req, res) => {
  const { userPackageId } = req.params;
  const { sessionsUsed } = req.body;

  const userPackage = await UserPackage.findById(userPackageId);

  if (!userPackage) {
    res.status(404);
    throw new Error('User package not found');
  }

  if (sessionsUsed != null) {
    if (sessionsUsed < 0 || sessionsUsed > userPackage.sessionsRemaining) {
      res.status(400);
      throw new Error('Invalid number of sessions used');
    }
    userPackage.sessionsRemaining -= sessionsUsed;
  }

  const updatedPackage = await userPackage.save();

  res.status(200).json(updatedPackage);
});

export const getUserPackages = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    res.status(401);
    throw new Error('User not authenticated');
  }

  const userPackages = await UserPackage.find({ user: userId })
    .populate('package')
    .populate('store', 'name');

  res.status(200).json(userPackages);
});

