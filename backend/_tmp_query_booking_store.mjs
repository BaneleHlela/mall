import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGODB_URL);
const services = mongoose.connection.collection('services');
const stores = mongoose.connection.collection('stores');

const activeServices = await services.find({ isActive: true }).limit(5).toArray();
console.log("Active services:", activeServices.map(s => ({ name: s.name, store: s.store })));

const storeIds = [...new Set(activeServices.map(s => s.store?.toString()))];
const { ObjectId } = mongoose.Types;
const storeDocs = await stores.find({ _id: { $in: storeIds.map(id => new ObjectId(id)) } }, { projection: { slug: 1, name: 1, trades: 1 } }).toArray();
console.log(JSON.stringify(storeDocs, null, 2));

await mongoose.disconnect();
