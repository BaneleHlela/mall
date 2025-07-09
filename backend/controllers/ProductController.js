import Product from '../models/ProductModel.js';
import asyncHandler from 'express-async-handler'; 
import mongoose from 'mongoose';
import { uploadToUploads } from '../config/gcsClient.js';

// Create product
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    stockQuantity,
    variations,
    category,
    isActive,
    tags,
    store, 
  } = req.body;

  const files = req.files; // array of images

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'At least one product image is required.' });
  }

  // Create slug
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 100);

  const imageUrls = [];

  for (const file of files) {
    const imageFileName = `${Date.now()}-${file.originalname}`;
    const imagePath = `stores/${store}/products/${slug}/${imageFileName}`;

    await uploadToUploads(file.buffer, imagePath);

    const imageUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${imagePath}`;
    imageUrls.push(imageUrl);
  }
  // Create product
  const product = await Product.create({
    name,
    description,
    price,
    stockQuantity,
    variations: Array.isArray(variations) ? variations : JSON.parse(variations),
    images: imageUrls,
    category,
    isActive,
    tags: Array.isArray(tags) ? tags : JSON.parse(tags),
    slug,
    store: new mongoose.Types.ObjectId(store),
  });

  res.status(201).json(product);
});

// Get product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new Error('Product not found');
  res.status(200).json(product);
});


// Get store products with optional category filter
export const getStoreProducts =asyncHandler(async (req, res) => {
  const { storeId } = req.params; 
  const { category } = req.query; 

  // Validate storeId
  if (!storeId || !mongoose.Types.ObjectId.isValid(storeId)) {
    res.status(400);
    throw new Error("Invalid Store ID");
  }


  // Convert storeId to ObjectId
  const storeObjectId = new mongoose.Types.ObjectId(storeId);

  // Build the query object
  const query = { store: storeObjectId }; // Filter by store ObjectId
  if (category) {
    query.category = category; // Add category filter if provided
  }

  console.log(query);
  try {
    // Fetch products based on the query
    const products = await Product.find(query);

    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to fetch store products");
  }
});


// Get product by slug
export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate('store');
  if (!product) throw new Error('Product not found');
  res.status(200).json(product);
});

// Update product
export const updateProduct = asyncHandler(async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) throw new Error('Product not found');
  res.status(200).json(updated);
});

// Delete product
export const deleteProduct = asyncHandler(async (req, res) => {
  const removed = await Product.findByIdAndDelete(req.params.id);
  if (!removed) throw new Error('Product not found');
  res.status(200).json({ message: 'Product deleted' });
});


export const getAllProducts = asyncHandler(async (req, res) => {
  const { store, category, search, featured, page = 1, limit = 20 } = req.query;

  const query = {};

  if (store) query.store = store;
  if (category) query.category = category;
  if (featured) query.isFeatured = featured === 'true';

  if (search) {
    query.name = { $regex: search, $options: 'i' }; // case-insensitive search
  }

  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .populate('store', 'name') // optionally populate store name
    //.populate('ratings') // optionally populate reviews
    .sort({ createdAt: -1 }) // newest first
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(query);

  res.status(200).json({
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    count: products.length,
    products,
  });
});


export const updateStockAndSoldCount = asyncHandler(async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('Invalid or empty items array');
  }

  const bulkOps = items.map(item => {
    const update = {
      $inc: {
        stockQuantity: -item.quantity,
        sold: item.quantity,
      },
    };

    return {
      updateOne: {
        filter: { _id: item.productId },
        update,
      },
    };
  });

  const result = await Product.bulkWrite(bulkOps);

  res.status(200).json({
    message: 'Stock and sold count updated',
    result,
  });
});


