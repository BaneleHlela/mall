import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGODB_URL);
const StoreLayout = mongoose.connection.collection('storelayouts');
const docs = await StoreLayout.find(
  { "menubar.variation": { $in: ["artMenubar", "cakeMenubar", "restuarantMenubar", "menubarWithSearchbar"] } },
  { projection: { "menubar.variation": 1, store: 1 } }
).limit(20).toArray();
console.log(JSON.stringify(docs, null, 2));
await mongoose.disconnect();
