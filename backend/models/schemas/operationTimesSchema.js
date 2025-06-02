import mongoose from 'mongoose';

const operationTimesSchema = new mongoose.Schema({
  alwaysOpen: {
    type: Boolean,
    default: false,
  },
  monday: {
    start: { type: String, default: "07:00" },
    end: { type: String, default: "17:00" },
    closed: { type: Boolean, default: false },
  },
  tuesday: {
    start: { type: String, default: "07:00" },
    end: { type: String, default: "17:00" },
    closed: { type: Boolean, default: false },
  },
  wednesday: {
    start: { type: String, default: "07:00" },
    end: { type: String, default: "17:00" },
    closed: { type: Boolean, default: false },
  },
  thursday: {
    start: { type: String, default: "07:00" },
    end: { type: String, default: "17:00" },
    closed: { type: Boolean, default: false },
  },
  friday: {
    start: { type: String, default: "07:00" },
    end: { type: String, default: "17:00" },
    closed: { type: Boolean, default: false },
  },
}, { _id: false }); 

export default operationTimesSchema;
