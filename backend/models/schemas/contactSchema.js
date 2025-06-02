import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"], 
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], 
  }, 
  addresses: [{
    name: { 
      type: String,
      default: "main",
    },
    street: {
      type: String,
      required: [true, "Street address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    province: {
      type: String,
      required: false, 
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
  }],
});

export default contactSchema;