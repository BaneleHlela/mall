import mongoose from 'mongoose';
import Product from '../models/ProductModel.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gizahlela_db_user:nIc44vojis9UcY9V@cluster0.jf9trd5.mongodb.net/the_mall';

const initializeProductPerfomanceStats = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // For docs with old stats, copy to perfomanceStats and remove stats? or keep for now.
    // Initialize perfomanceStats where missing, copying from stats if present
    const result = await Product.updateMany(
      { perfomanceStats: { $exists: false } },
      [
        {
          $set: {
            perfomanceStats: {
              $ifNull: [
                "$stats",
                {
                  views: 0,
                  purchases: 0,
                  ratingSummary: {
                    averageRating: 0,
                    numberOfRatings: 0,
                    reviews: []
                  }
                }
              ]
            }
          }
        }
      ]
    );

    console.log(`Updated ${result.modifiedCount} Product documents with perfomanceStats field`);

    // Verify
    const totalDocs = await Product.countDocuments();
    const docsWithPerf = await Product.countDocuments({ perfomanceStats: { $exists: true } });

    console.log(`\n--- Verification ---`);
    console.log(`Total Product documents: ${totalDocs}`);
    console.log(`Documents with perfomanceStats field: ${docsWithPerf}`);

    if (docsWithPerf === totalDocs) {
      console.log('✅ Initialization successful');
    } else {
      console.log('❌ Incomplete');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

initializeProductPerfomanceStats();
