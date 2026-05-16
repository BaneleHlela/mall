import mongoose from "mongoose";
import { GeoPointSchema, ZoneSchema, DocumentSchema, EarningsSchema } from "./schemas/driverSchemas.js";
import operationTimesSchema from "./schemas/operationTimesSchema.js";

// ─────────────────────────────────────────────
// Main Driver Schema
// ─────────────────────────────────────────────

const DriverSchema = new mongoose.Schema(
  {
    // ── Reference to User ─────────────────────
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    // ── Account Status ────────────────────────
    accountStatus: {
      type: String,
      enum: {
        values: ["pending", "active", "suspended", "banned"],
        message: "{VALUE} is not a valid account status.",
      },
      default: "pending", // pending until documents are verified
    },

    /**
     * isLive: driver has toggled themselves online and is ready to accept jobs.
     * Only meaningful when accountStatus === 'active'.
     */
    isLive: {
      type: Boolean,
      default: false,
    },
    lastSeenAt: {
      type: Date,
      default: null,
    },

    // ── Vehicle ───────────────────────────────
    vehicle: {
      type: {
        type: String,
        enum: {
          values: ["bicycle", "motorbike", "car", "van", "truck"],
          message: "{VALUE} is not a supported vehicle type.",
        },
        required: [true, "Vehicle type is required."],
      },
      images: { 
        type: [String],
        required: true
      },
      /**
       * Only relevant when vehicle.type === 'truck'.
       * 'sand_and_blocks' — bulk construction materials only.
       * 'general'         — large general goods (furniture, appliances, etc.).
       * 'both'            — driver accepts both categories.
       */
      truckCategory: {
        type: String,
        enum: {
          values: ["sand_and_blocks", "general", "both", null],
          message: "{VALUE} is not a valid truck category.",
        },
        default: null,
        validate: {
          validator: function (v) {
            // truckCategory is required when vehicle type is truck
            if (this.vehicle?.type === "truck") return v !== null;
            // must be null for all other vehicle types
            return v === null;
          },
          message:
            "truckCategory is required for truck drivers and must be null for all other vehicle types.",
        },
      },
      registrationNumber: {
        type: String,
        trim: true,
        default: null, // optional for bicycles
      },
    },

    // ── Delivery Preferences ──────────────────
    /**
     * Whether the driver accepts orders that include alcohol.
     * Drivers who opt out will never be matched to alcohol-flagged orders.
     */
    alcoholDelivery: {
      type: Boolean,
      default: false,
    },

    // ── Zones (GeoJSON) ───────────────────────
    /**
     * collectionZones: areas where this driver will pick up orders.
     * Typically centred on Emadadeni Mall or nearby hubs.
     */
    collectionZones: {
      type: [ZoneSchema],
      default: [],
      validate: {
        validator: (v) => v.length <= 10,
        message: "A driver cannot have more than 10 collection zones.",
      },
    },

    /**
     * deliveryZones: residential/commercial areas where this driver delivers.
     * An order is only matched to this driver if both:
     *   - the store falls within one of their collectionZones, AND
     *   - the customer address falls within one of their deliveryZones.
     */
    deliveryZones: {
      type: [ZoneSchema],
      default: [],
      validate: {
        validator: (v) => v.length <= 10,
        message: "A driver cannot have more than 10 delivery zones.",
      },
    },
    // ── Documents ─────────────────────────────
    documents: {
      idOrPassport: {
        type: DocumentSchema,
        default: null,
      },
      criminalClearance: {
        type: DocumentSchema,
        default: null,
      },
      driversLicence: {
        type: DocumentSchema,
        default: null, // not required for bicycle drivers
      },
      vehicleRegistration: {
        type: DocumentSchema,
        default: null, // not required for bicycle drivers
      },
    },
    // ── Ratings ───────────────────────────────
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    operationTimes: operationTimesSchema,
    // ── Earnings ──────────────────────────────
    earnings: {
      type: EarningsSchema,
      default: () => ({}),
    },
    // ── Soft Delete ───────────────────────────
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─────────────────────────────────────────────
// Indexes
// ─────────────────────────────────────────────

// 2dsphere indexes enable MongoDB geospatial queries (e.g. $geoWithin, $near)
DriverSchema.index({ "collectionZones.centre": "2dsphere" });
DriverSchema.index({ "deliveryZones.centre": "2dsphere" });

// Compound index for matching available drivers quickly
DriverSchema.index({ isLive: 1, accountStatus: 1, alcoholDelivery: 1 });

// ─────────────────────────────────────────────
// Virtuals
// ─────────────────────────────────────────────

/**
 * documentsVerified: true only when all required documents are uploaded AND verified.
 * Bicycle drivers don't need a licence or vehicle registration.
 */
DriverSchema.virtual("documentsVerified").get(function () {
  const { idOrPassport, criminalClearance, driversLicence, vehicleRegistration } =
    this.documents || {};

  const baseVerified =
    idOrPassport?.verified && criminalClearance?.verified;

  if (this.vehicle?.type === "bicycle") return baseVerified;

  return baseVerified && driversLicence?.verified && vehicleRegistration?.verified;
});

// ─────────────────────────────────────────────
// Instance Methods
// ─────────────────────────────────────────────

/**
 * Toggle the driver's live status.
 * Only active drivers with verified documents can go live.
 */
DriverSchema.methods.toggleLive = async function () {
  if (this.accountStatus !== "active") {
    throw new Error("Only active drivers can toggle live status.");
  }
  if (!this.documentsVerified) {
    throw new Error("All required documents must be verified before going live.");
  }
  this.isLive = !this.isLive;
  this.lastSeenAt = new Date();
  return this.save();
};

/**
 * Update the driver's rating after a new review.
 * @param {number} newScore — score between 1 and 5
 */
DriverSchema.methods.addRating = async function (newScore) {
  if (newScore < 1 || newScore > 5) throw new Error("Rating must be between 1 and 5.");
  const { count, average } = this.rating;
  this.rating.average = (average * count + newScore) / (count + 1);
  this.rating.count += 1;
  return this.save();
};

/**
 * Log a completed delivery and update earnings.
 * @param {number} amount — driver's cut for this delivery (in ZAR)
 */
DriverSchema.methods.recordEarning = async function (amount) {
  if (amount < 0) throw new Error("Earning amount cannot be negative.");
  this.earnings.totalEarned += amount;
  this.earnings.pendingPayout += amount;
  this.earnings.totalDeliveries += 1;
  return this.save();
};

// ─────────────────────────────────────────────
// Static Methods
// ─────────────────────────────────────────────

/**
 * Find all live drivers whose delivery zone covers a given customer point
 * AND whose collection zone covers a given store point.
 *
 * @param {[number, number]} storeCoords    — [lng, lat] of the store
 * @param {[number, number]} customerCoords — [lng, lat] of the customer
 * @param {boolean}          needsAlcohol   — whether the order contains alcohol
 */
DriverSchema.statics.findAvailable = function (
  storeCoords,
  customerCoords,
  needsAlcohol = false
) {
  const query = {
    isLive: true,
    accountStatus: "active",
    "collectionZones.centre": {
      $geoWithin: {
        $centerSphere: [storeCoords, 5000 / 6378100], // 5 km in radians
      },
    },
    "deliveryZones.centre": {
      $geoWithin: {
        $centerSphere: [customerCoords, 5000 / 6378100],
      },
    },
  };

  if (needsAlcohol) query.alcoholDelivery = true;

  return this.find(query).select("-passwordHash");
};

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────

// Prevent suspended/banned drivers from going live
DriverSchema.pre("save", function (next) {
  if (this.isLive && this.accountStatus !== "active") {
    this.isLive = false;
  }
  next();
});

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────

const Driver = mongoose.model("Driver", DriverSchema);
export default Driver;