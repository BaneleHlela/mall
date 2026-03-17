import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Store from '../models/StoreModel.js';

// Load environment variables
dotenv.config({ path: '../.env' });

async function initializeStoreState() {
  console.log('Starting storeState initialization...');
  console.log('MONGODB_URL:', process.env.MONGODB_URL);
  
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
    
    // Find all stores that don't have storeState set (i.e., still have default 'draft')
    // or are missing the storeState field
    const result = await Store.updateMany(
      { 
        $or: [
          { storeState: { $exists: false } },
          { storeState: 'draft' }
        ]
      },
      [
        {
          $set: {
            storeState: {
              $cond: {
                if: { $eq: ['$isDemo', true] },
                then: 'demo',
                else: 'idle'
              }
            }
          }
        }
      ]
    );
    
    console.log(`Initialization complete. Updated ${result.modifiedCount} stores.`);
    
    // Show some stats
    const demoCount = await Store.countDocuments({ storeState: 'demo' });
    const idleCount = await Store.countDocuments({ storeState: 'idle' });
    const liveCount = await Store.countDocuments({ storeState: 'live' });
    
    console.log(`Current storeState counts:`);
    console.log(`  - demo: ${demoCount}`);
    console.log(`  - idle: ${idleCount}`);
    console.log(`  - live: ${liveCount}`);
    
  } catch (error) {
    console.error('Error initializing storeState:', error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from database.');
    process.exit(0);
  }
}

initializeStoreState();
