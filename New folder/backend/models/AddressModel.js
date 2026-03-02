import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";
import User from "./UserModel.js";

const addressSchema = new mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    suburb: {
      type: String,
      required: true,
    },
    phoneNumber:{
      type:String,
      required:false,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  });

// set the default phone number in addressSchema
addressSchema.pre('save', expressAsyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    if (!addressSchema.phoneNumber) {
        const user = await User.findById(_id);
        if (user) {
            this.phoneNumber = user.mobile;
        }
    }
    next();
    }
));

export const Address = mongoose.model('Address', addressSchema);

