import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import Store from '../models/StoreModel.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gizahlela_db_user:nIc44vojis9UcY9V@cluster0.jf9trd5.mongodb.net/the_mall';

const migrateUserStores = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all stores
    const stores = await Store.find();
    console.log(`Found ${stores.length} stores`);

    let updatedUsersCount = 0;

    for (const store of stores) {
      // Get all team member IDs for this store
      const teamMemberIds = store.team.map(member => member.member);

      // Update each team member's stores array
      for (const userId of teamMemberIds) {
        const result = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { stores: store._id } },
          { new: true }
        );

        if (result) {
          updatedUsersCount++;
          console.log(`Added store "${store.name}" (${store._id}) to user ${result.username}`);
        }
      }
    }

    console.log(`\nMigration complete! Updated ${updatedUsersCount} user-store associations`);
    
    // Verify the migration
    const users = await User.find().populate('stores');
    console.log('\n--- Verification ---');
    for (const user of users) {
      console.log(`User ${user.username} has ${user.stores?.length || 0} stores`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
};

migrateUserStores();
