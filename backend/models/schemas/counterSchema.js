import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "order"
  value: { type: Number, default: 100000 }
});

export default mongoose.model("Counter", counterSchema);