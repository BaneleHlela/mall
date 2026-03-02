import mongoose from 'mongoose';
import dotenv from 'dotenv';
import StoreLayout from '../models/StoreLayout.js';

// Load environment variables
dotenv.config();

const initializeLayoutSource = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/the-mall';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all layouts that don't have source initialized or have source.source as undefined
    const layouts = await StoreLayout.find({
      $or: [
        { source: { $exists: false } },
        { 'source.source': { $exists: false } },
        { 'source.source': null }
      ]
    });

    console.log(`Found ${layouts.length} layouts without source initialized`);

    let updatedCount = 0;

    for (const layout of layouts) {
      // Initialize source as internal for all existing layouts
      layout.source = {
        source: 'internal',
        websiteName: undefined,
        websiteUrl: undefined
      };
      await layout.save();
      updatedCount++;
    }

    console.log(`Successfully initialized source for ${updatedCount} layouts`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('Error initializing layout source:', error);
    process.exit(1);
  }
};

// Run the script
initializeLayoutSource();
