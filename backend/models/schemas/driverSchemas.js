import mongoose from "mongoose";

// ─────────────────────────────────────────────
// GeoJSON Point — used for collection & delivery zone centres.
// A 2dsphere index on these fields enables efficient radius queries.
// coordinates: [longitude, latitude]  ← GeoJSON order (lng first)
// ─────────────────────────────────────────────
export const GeoPointSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      validate: {
        validator: (v) =>
          Array.isArray(v) &&
          v.length === 2 &&
          v[0] >= -180 && v[0] <= 180 &&   // longitude
          v[1] >= -90  && v[1] <= 90,       // latitude
        message: "coordinates must be [longitude, latitude] with valid ranges.",
      },
    },
  },
  { _id: false }
);

// ─────────────────────────────────────────────
// A named zone with a GeoJSON centre point and a radius (in metres).
// e.g. { label: "Emadadeni", centre: { type: "Point", coordinates: [29.98, -27.76] }, radiusMetres: 5000 }
// ─────────────────────────────────────────────
export const ZoneSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      maxlength: [100, "Zone label cannot exceed 100 characters."],
    },
    centre: {
      type: GeoPointSchema,
      required: true,
    },
    radiusMetres: {
      type: Number,
      required: true,
      min: [100, "Radius must be at least 100 metres."],
      max: [100000, "Radius cannot exceed 100 km."],
      default: 5000, // 5 km default
    },
  },
  { _id: false }
);

// ─────────────────────────────────────────────
// Required documents uploaded by the driver during onboarding.
// Stores file URLs (e.g. S3 / Cloudinary links) and verification status.
// ─────────────────────────────────────────────
export const DocumentSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

// ─────────────────────────────────────────────
// Tracks cumulative driver earnings.
// ─────────────────────────────────────────────
export const EarningsSchema = new mongoose.Schema(
  {
    totalEarned: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalDeliveries: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastPayoutAt: {
      type: Date,
      default: null,
    },
    pendingPayout: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);