import mongoose from 'mongoose';
import operationTimesSchema from './schemas/operationTimesSchema.js';
import contactSchema from './schemas/contactSchema.js';

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Store name is required"],
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
    // locations: [{
		// 	nickname: {type: String},
		// 	lat: Number,
		// 	lng: Number,
		// 	address: String,
		// }],
    location: {
			nickname: {type: String},
			lat: Number,
			lng: Number,
			address: String,
		},
    about: {
      type: String,
    }, 
    team: [{
      member: {
        type: String,
        required: true, 
      },
      username: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
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


