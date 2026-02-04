import mongoose from 'mongoose';
import Package from '../models/PackageModel.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/themall';

async function migratePackagesSessions() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all packages that have sessions as a number (old format)
    const packages = await Package.find({
      $or: [
        { sessions: { $type: 'number' } },
        { sessions: { $exists: true }, 'sessions.amount': { $exists: false } }
      ]
    });

    console.log(`Found ${packages.length} packages to migrate`);

    for (const pkg of packages) {
      // Check if sessions is a number (old format)
      if (typeof pkg.sessions === 'number') {
        const oldSessions = pkg.sessions;
        pkg.sessions = {
          amount: oldSessions,
          duration: 45, // Default duration of 45 minutes
        };
        await pkg.save();
        console.log(`Migrated package ${pkg._id}: ${oldSessions} sessions -> { amount: ${oldSessions}, duration: 45 }`);
      }
    }

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migratePackagesSessions();
