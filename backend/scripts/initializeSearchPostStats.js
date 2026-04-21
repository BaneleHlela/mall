import mongoose from 'mongoose';
import SearchPost from '../models/SearchPostModel.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gizahlela_db_user:nIc44vojis9UcY9V@cluster0.jf9trd5.mongodb.net/the_mall';

const initializeSearchPostStats = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update all SearchPost documents that don't have stats field
    const result = await SearchPost.updateMany(
      { stats: { $exists: false } },
      {
        $set: {
          stats: {
            clicks: 0,
            likelihoodIndex: 1
          }
        }
      }
    );

    console.log(`Updated ${result.modifiedCount} SearchPost documents with stats field`);

    // Verify the migration
    const totalDocs = await SearchPost.countDocuments();
    const docsWithStats = await SearchPost.countDocuments({ stats: { $exists: true } });

    console.log(`\n--- Verification ---`);
    console.log(`Total SearchPost documents: ${totalDocs}`);
    console.log(`Documents with stats field: ${docsWithStats}`);

    if (docsWithStats === totalDocs) {
      console.log('✅ Migration successful: All documents now have stats field');
    } else {
      console.log('❌ Migration incomplete: Some documents may still be missing stats field');
    }

    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
};

initializeSearchPostStats();