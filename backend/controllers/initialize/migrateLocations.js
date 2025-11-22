import mongoose from 'mongoose';
import Store from '../../models/StoreModel.js';
import dotenv from 'dotenv';

dotenv.config({ path:  "../../../.env" });

console.log(process.env.MONGODB_URL);

async function migrateStoreLocations() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');

    // Find stores with old location format (lat/lng properties)
    const storesToMigrate = await Store.find({
      'location.lat': { $exists: false },
      'location.lng': { $exists: false },
      'location.coordinates': { $exists: true }
    });

    console.log(`Found ${storesToMigrate.length} stores to migrate`);

    let migratedCount = 0;
    let errorCount = 0;

    for (const store of storesToMigrate) {
      try {
        const oldLat = -27.749777127380;
        const oldLng = 30.065556343860298;
        const nickname = store.location.nickname;
        const address = store.location.address;

        // Update to new GeoJSON format
        store.location = {
          type: 'Point',
          coordinates: [oldLng, oldLat], // [lng, lat]
          nickname: nickname,
          address: address
        };

        await store.save();
        migratedCount++;
        console.log(`Migrated store: ${store.name} (${store._id})`);
      } catch (error) {
        console.error(`Error migrating store ${store._id}:`, error.message);
        errorCount++;
      }
    }

    console.log(`Migration completed:`);
    console.log(`- Successfully migrated: ${migratedCount} stores`);
    console.log(`- Errors: ${errorCount} stores`);

    // Verify the migration by checking a few stores
    const sampleStores = await Store.find({
      'location.coordinates': { $exists: true }
    }).limit(3);

    console.log('\nSample migrated stores:');
    sampleStores.forEach(store => {
      console.log(`- ${store.name}: coordinates [${store.location.coordinates}]`);
    });

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the migration
migrateStoreLocations();