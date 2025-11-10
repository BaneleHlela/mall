import mongoose from 'mongoose';
import Store from '../models/StoreModel.js';
import Service from '../models/ServiceModel.js';
import Product from '../models/ProductModel.js';
import { generateSlug } from './helperFunctions.js';

const initSlugs = async () => {
  try {
    // Initialize store slugs
    const stores = await Store.find({ slug: { $exists: false } });

    for (const store of stores) {
      store.slug = generateSlug(store.name);
      await store.save();
      console.log(`Updated store ${store.name} with slug ${store.slug}`);
    }

    console.log(`Initialized slugs for ${stores.length} stores`);

    // Initialize service slugs
    const services = await Service.find({ slug: { $exists: false } });

    for (const service of services) {
      const baseSlug = service.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .substring(0, 100);

      const timestamp = Date.now();
      service.slug = `${baseSlug}-${timestamp}`;
      await service.save();
      console.log(`Updated service ${service.name} with slug ${service.slug}`);
    }

    console.log(`Initialized slugs for ${services.length} services`);

    // Initialize product slugs
    const products = await Product.find({ slug: { $exists: false } });

    for (const product of products) {
      const baseSlug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .substring(0, 100);

      const timestamp = Date.now();
      product.slug = `${baseSlug}-${timestamp}`;
      await product.save();
      console.log(`Updated product ${product.name} with slug ${product.slug}`);
    }

    console.log(`Initialized slugs for ${products.length} products`);

  } catch (error) {
    console.error('Error initializing slugs:', error);
  }
};

export default initSlugs;