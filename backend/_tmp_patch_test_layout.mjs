import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGODB_URL);
const col = mongoose.connection.collection('storelayouts');
const { ObjectId } = mongoose.Types;

const layoutId = process.argv[2];
const before = await col.findOne({ _id: new ObjectId(layoutId) }, { projection: { "menubar.alertDiv": 1, "menubar.topbar.order": 1, "menubar.topbar.stack": 1 } });
console.log("Before:", JSON.stringify(before, null, 2));

await col.updateOne({ _id: new ObjectId(layoutId) }, { $set: { "menubar.alertDiv.display": false } });

const after = await col.findOne({ _id: new ObjectId(layoutId) }, { projection: { "menubar.alertDiv": 1 } });
console.log("After:", JSON.stringify(after, null, 2));

await mongoose.disconnect();
