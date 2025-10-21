import Product from '../models/ProductModel.js';
import asyncHandler from 'express-async-handler'; 
import mongoose from 'mongoose';
import { uploadToUploads } from '../config/gcsClient.js';


export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    stockQuantity,
    variations,
    price,
    prices,
    category,
    isActive,
    tags,
    store,
    marking,
  } = req.body;

  

  const files = req.files; // array of images

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'At least one product image is required.' });
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
  const parsedVariations = Array.isArray(variations)
    ? variations
    : variations
    ? JSON.parse(variations)
    : [];

  const parsedTags = Array.isArray(tags)
    ? tags
    : tags
    ? JSON.parse(tags)
    : [];

  const parsedPrices = Array.isArray(prices)
    ? prices
    : prices
    ? JSON.parse(prices)
    : [];

  // Validate prices format
  if (
    !Array.isArray(parsedPrices) ||
    parsedPrices.some(p => typeof p.amount !== 'number' || p.amount < 0)
  ) {
    return res.status(400).json({ message: 'Invalid prices format.' });
  }

  const imageUrls = [];

  for (const file of files) {
    const imageFileName = `${Date.now()}-${file.originalname}`;
    const imagePath = `stores/${store}/products/${slug}/${imageFileName}`;

    await uploadToUploads(file.buffer, imagePath);

    const imageUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${imagePath}`;
    imageUrls.push(imageUrl);
  }

  console.log("creating product")

  const product = await Product.create({
    name,
    description,
    prices: parsedPrices,
    stockQuantity,
    variations: parsedVariations,
    images: imageUrls,
    price,
    category,
    isActive,
    tags: parsedTags,
    slug,
    marking,
    store: new mongoose.Types.ObjectId(store),
  });

  res.status(201).json(product);
});


// Update product
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, stockQuantity, variations, price, prices, category, isActive, tags, store } = req.body;
  const files = req.files; // array of images
  console.log(req.body.isActive);

  
  if (!req.body.isActive && (!files || files.length === 0) && (req.body.imageUrls.length === 0)) {
    return res.status(400).json({ message: 'At least one product image is required.' });
  }

  const productId = req.params.id;

  // Find the existing product
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  // Array to store image URLs
  const imageUrls = [];

  if (files && files.length > 0) {
    // Upload new images
    for (const file of files) {
      const imageFileName = `${Date.now()}-${file.originalname}`;
      const imagePath = `stores/${store}/products/${product.slug}/${imageFileName}`;

      await uploadToUploads(file.buffer, imagePath); // assuming uploadToUploads handles file upload

      const imageUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${imagePath}`;
      imageUrls.push(imageUrl);
    }
  }

  // Merge new images with the existing ones (if any)
  const updatedImages = [...product.images, ...imageUrls];
  
  // Prepare updated product data
  const updatedProductData = {
    name: name || product.name,
    description: description || product.description,
    stockQuantity: stockQuantity || product.stockQuantity,
    variations: variations || product.variations,
    price: price || product.price,
    prices: prices || product.prices,
    category: category || product.category,
    isActive: isActive || product.isActive,
    tags: tags || product.tags,
    images: updatedImages,
  };

  // Update product
  const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });

  if (!updatedProduct) {
    return res.status(500).json({ message: 'Failed to update product.' });
  }

  res.status(200).json(updatedProduct);
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


