import mongoose from 'mongoose';
import Product from '../../models/ProductModel.js'; 
import dotenv from "dotenv";


dotenv.config({ path:  "../../../.env" });

const migrateProductPrices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const products = await Product.find({});

    let updatedCount = 0;

    for (const product of products) {
      // Skip if prices already exist and not empty
      if (product.prices && product.prices.length > 0) continue;

      const basePrice = product.price || 0;
      const prices = [];

      if (product.variations && product.variations.length > 0) {
        for (const variation of product.variations) {
          prices.push({
            variation,
            amount: basePrice,
          });
        }
      } else {
        prices.push({
          variation: '', // no variation name
          amount: basePrice,
        });
      }

      product.prices = prices;
      await product.save();
      updatedCount++;
    }

    console.log(`✅ Migration complete. Updated ${updatedCount} products.`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateProductPrices();
