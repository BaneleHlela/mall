import mongoose from 'mongoose';
import operationTimesSchema from './schemas/operationTimesSchema.js';
import contactSchema from './schemas/contactSchema.js';

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Store name is required"],
    },
    logo: {
      url: {
        type: String,
        default: "",
      },
      text: {
        type: String,
        default: "",
      },
    },
    slogan: {
      type: String,
      default: ""
    },
    thumbnail: {
      type: String,
      deafult: "",
    },
    description: {
      type: String,
      required: [true, "Store description name is required"],
    },
    contact: contactSchema,
    departments: [{
      type: String, 
      required: [true, "Store department is required"], 
    }],
    layouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "StoreLayout"
    }],
    about: {
      type: String,
      required: [true, "Store description is required"],
    },
    team: [{
      member: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true, 
      },
      role: {
          type: String,
          enum: ["owner", "manager", "staff", "viewer", "admin"], 
          default: "owner", 
      },
    }],
    businessType: {
      type: String,
      enum: ['sole', 'partnership', 'company', 'corporation', 'LLC', 'non-profit', 'franchise'],
      default: 'sole',
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    thumbnail:{
      type:String,
      default: "gooapi.mythumbnail"
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    trades: {
      type: Number,
      default: 4,
    },
    categories: [{
      type: Array,
      default: []
    }],
    operationTimes: {
      type: operationTimesSchema,
      default: () => ({}), // Default to an empty object
    },
    images: [{
      category: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        default: "",
      }
    }],
  },
  {
    timestamps: true,
  }
);

storeSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret._id = ret._id.toString();
    return ret;
  }
});

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);
export default Store; 


