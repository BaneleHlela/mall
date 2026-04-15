import mongoose from 'mongoose';

const visitLogSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
    index: true
  },
  visitorId: String, // cookie/device ID
  ip: String,
  userAgent: String,
  referrer: String,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  source: {
    type: String,
    enum: ['website', 'qr_scan', 'directions', 'search', 'direct'],
    default: 'website'
  }
}, { timestamps: true });

// Create compound index for deduplication
visitLogSchema.index({ storeId: 1, visitorId: 1, timestamp: 1 }, { unique: true });

const VisitLog = mongoose.models.VisitLog || mongoose.model('VisitLog', visitLogSchema);
export default VisitLog;