import mongoose from 'mongoose';
import operationTimesSchema from './schemas/operationTimesSchema.js';
import contactSchema from './schemas/contactSchema.js';

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Store name is required"],
    },
    nickname: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
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
    payment: {
      provider: {
        type: String,
        enum: ['payfast', 'paypal', 'stripe', 'razorpay', 'none'],
        default: 'none',
      },
      merchantId: {
        type: String,
        default: "",
      },
      merchantKey: {
        type: String,
        default: "",
      },
      passphrase: {
        type: String,
        default: "",
      },
      isActive: {
        type: Boolean,
        default: false,
      }
    },
    subscription: {
      isActive: {
        type: Boolean,
        default: false,
      },
      startDate: {
        type: Date,
      },
      plan: {
        type: String,
        default: 'pre-launch',
      },
      amount: {
        type: Number,
        default: 25.00,
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
    contact: {
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
      whatsapp: {
        type: String,
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
    website: {
      source: {
        type: String,
        enum: ['internal', 'custom', 'external'],
        default: 'internal'
      },
      layoutId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StoreLayout"
      },
      websiteName: {
        type: String
      },
      websiteUrl: {
        type: String
      }
    },
    socials: [{
      platform: {
        type: String,
        enum: ['facebook', 'twitter', 'instagram', 'linkedin', 'pinterest', 'youtube', "whatsapp", "phone"],
      }, 
      url: {
        type: String,
      },
    }],
    likes: {
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
      users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }],
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
      nickname: { type: String },
      address: { type: String },
    },
    about: {
      type: String,
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
      about: {
        type: String,
      },
      image: {
        type: String,
        default: "",
      }
    }],
    businessType: {
      type: String,
      enum: ['sole', 'partnership', 'company', 'corporation', 'LLC', 'non-profit', 'franchise'],
      default: 'sole',
    },
    flag: {
      red: {
        type: Boolean,
      },
      level: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
      },
      reason: {
        type: String,
      }
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    thumbnails:{
      storeCard: { 
        type: String,
        default: "",
      },
      profily: {
        type: String,
        default: "",
      },
      reely: {
        type: String,
        default: "",
      },
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    trades: [{
      type: String,
    }], // for e.g ["products", "services", "packages"] or ["none"]
    categories: {
      products: {
        type: [String],
        default: [],
      },
      services: {
        type: [String],
        default: [],
      },
      rentals: {
        type: [String],
        default: [],
      },
      donations: {
        type: [String],
        default: [],
      },
      packages: {
        type: [String],
        default: [],
      },
    },
    operationTimes: operationTimesSchema,
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
    isDemo: {
      type: String,
      default: false,
    },
    rating: {
      averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      numberOfRatings: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    delivers: {
      enabled: {
        type: Boolean,
        default: false,
      },
      range: {
        type: Number, 
        default: 0,
      },
    },
    visits: {
      type: Number,
      default: 0,
    },
    manualStatus: {
      isOverridden: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
      },
      overriddenAt: {
        type: Date,
      },
      overriddenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    }
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
storeSchema.index({ 'location': '2dsphere' });


const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);
export default Store; 


