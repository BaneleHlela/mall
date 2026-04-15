import mongoose from 'mongoose';

const billingSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Optional: leave null for store-level billing
    },
    amount: {
      type: Number,
      required: true, // 1 cent = 1 (in cents, matching your StoreModel convention)
    },
    type: {
      type: String,
      enum: ['subscription', 'visit', 'transaction_fee', 'premium_feature', 'other'],
      required: true,
    },
    description: {
      type: String,
      default: '', // E.g., "Visit fee for new visitor"
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'billed', 'paid', 'failed'],
      default: 'pending', // Start as 'pending'; update to 'billed' when processed
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
billingSchema.index({ store: 1, date: -1 }); // For store billing history
billingSchema.index({ type: 1, date: -1 }); // For visit-specific analytics

const Billing = mongoose.models.Billing || mongoose.model('Billing', billingSchema);
export default Billing;