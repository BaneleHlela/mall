import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGODB_URL);
const col = mongoose.connection.collection('storelayouts');

const variations = ["artMenubar", "cakeMenubar", "restuarantMenubar", "menubarWithSearchbar"];
const result = {};

for (const v of variations) {
  const original = await col.findOne({ "menubar.variation": v });
  if (!original) {
    result[v] = null;
    continue;
  }
  const clone = { ...original };
  delete clone._id;
  clone.name = `__smoketest_${v}`;
  clone.isSharable = false;
  const inserted = await col.insertOne(clone);
  result[v] = { newLayoutId: inserted.insertedId.toString(), sourceLayoutId: original._id.toString(), store: original.store?.toString?.() ?? original.store };
}

console.log(JSON.stringify(result, null, 2));
await mongoose.disconnect();
