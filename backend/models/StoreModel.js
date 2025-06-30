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
    },
    contact: {
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
      whatsapp: {
        type: String,
        match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
      }
    },
    departments: [{
      type: String, 
      required: [true, "Store department is required"], 
    }],
    layouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "StoreLayout"
    }],
    socials: [{
      platform: {
        type: String,
        enum: ['facebook', 'twitter', 'instagram', 'linkedin', 'pinterest', 'youtube', "whatsapp", "phone"],
      }, 
      url: {
        type: String,
      },
    }],
    locations: [{
			nickname: {type: String},
			lat: Number,
			lng: Number,
			address: String,
		}],
    about: {
      type: String,
      required: [true, "Store description is required"],
    }, //Converting to an array of strings
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
      default: 4, //1 for product, 2 for services, 3 for packages, 4 for products and services, 5 for products and packages, 
    },
    categories: {
      products: {
        type: [String],
        default: [],
      },
      services: {
        type: [String],
        default: [],
      },
    },
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


