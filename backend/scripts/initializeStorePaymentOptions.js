import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Store from '../models/StoreModel.js';

// Load environment variables
dotenv.config({ });

async function initializeStorePaymentOptions() {
  console.log('Starting store payment options initialization...');
  console.log('MONGODB_URL:', process.env.MONGODB_URL);

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');

    // Update all stores to set payment options to true
    const result = await Store.updateMany(
      {},
      {
        $set: {
          'payment.cash.inStore': true,
          'payment.cash.onDelivery': true,
          'payment.cash.card.inStore': true,
          'payment.cash.card.onDelivery': true,
        }
      }
    );

    console.log(`Initialization complete. Updated ${result.modifiedCount} stores.`);

    // Show some stats
    const totalStores = await Store.countDocuments();
    console.log(`Total stores in database: ${totalStores}`);

  } catch (error) {
    console.error('Error initializing store payment options:', error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from database.');
    process.exit(0);
  }
}

initializeStorePaymentOptions();