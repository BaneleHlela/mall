import Product from '../models/ProductModel.js';
import asyncHandler from 'express-async-handler'; 
import mongoose from 'mongoose';
import { uploadToUploads, deleteFromUploads } from '../config/gcsClient.js';
import { ConsoleMessage } from 'puppeteer';


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
  let {
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
    imageUrls: retainedImages = [],
  } = req.body;


  const files = req.files; // newly uploaded images


  // 🧩 Parse JSON fields if they came in as strings
  try {
    if (typeof variations === "string") variations = JSON.parse(variations);
    if (typeof prices === "string") prices = JSON.parse(prices);
    if (typeof tags === "string") tags = JSON.parse(tags);
    if (typeof retainedImages === "string") retainedImages = JSON.parse(retainedImages);
  } catch (err) {
    console.error("Error parsing product fields:", err);
    return res.status(400).json({ message: "Invalid JSON format in request body." });
  }

  // ✅ Validation
  if (!isActive && (!files || files.length === 0) && retainedImages.length === 0) {
    return res.status(400).json({ message: "At least one product image is required." });
  }

  // ✅ Find existing product
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  // 1️⃣ Identify images to delete
  const oldImages = product.images || [];
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
      const imagePath = `stores/${store}/products/${product.slug}/${imageFileName}`;
      await uploadToUploads(file.buffer, imagePath);
      const imageUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${imagePath}`;
      newImageUrls.push(imageUrl);
    }
  }

  // 4️⃣ Merge remaining and new images
  const updatedImages = [...retainedImages, ...newImageUrls];

  // 5️⃣ Prepare updated product data
  const updatedProductData = {
    name: name || product.name,
    description: description || product.description,
    stockQuantity: stockQuantity ?? product.stockQuantity,
    variations: variations || product.variations,
    price: price ?? product.price,
    prices: prices || product.prices,
    category: category || product.category,
    isActive: isActive ?? product.isActive,
    tags: tags || product.tags,
    marking: marking || product.marking,
    images: updatedImages,
  };

  // 6️⃣ Save updated product
  const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
  if (!updatedProduct) {
    return res.status(500).json({ message: "Failed to update product." });
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

// Delete product and its images from Google Cloud
export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  // 1️⃣ Find product first
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  // 2️⃣ Delete all images from Google Cloud Storage
  const images = product.images || [];
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

  // 3️⃣ Delete the product document from MongoDB
  const removed = await Product.findByIdAndDelete(productId);
  if (!removed) {
    return res.status(500).json({ message: "Failed to delete product." });
  }

  res.status(200).json({ message: "Product and its images deleted successfully." });
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

export const updateIsActive = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { isActive } = req.body;

  // Validate input
  if (typeof isActive !== 'boolean') {
    res.status(400);
    throw new Error('isActive must be a boolean value.');
  }

  // Find product
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found.');
  }

  // Update and save
  product.isActive = isActive;
  const updatedProduct = await product.save();

  res.status(200).json({
    message: 'Product status updated successfully.',
    product: updatedProduct,
  });
});

