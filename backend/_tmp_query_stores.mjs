import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGODB_URL);
const stores = mongoose.connection.collection('stores');

const ids = ["686e76aa96f14c28650b671d", "68726dde5987f5810dee5a8a", "690b86f9423e034c4fec9d69", "6895c4d6a50d393f431b9d47"];
const { ObjectId } = mongoose.Types;
const docs = await stores.find({ _id: { $in: ids.map(id => new ObjectId(id)) } }, { projection: { slug: 1, name: 1, trades: 1 } }).toArray();
console.log(JSON.stringify(docs, null, 2));

// Also find any store with a 'services' trade and existing services (for booking flow test)
const services = mongoose.connection.collection('services');
const anyService = await services.findOne({});
console.log("Sample service:", JSON.stringify(anyService, null, 2));

await mongoose.disconnect();
