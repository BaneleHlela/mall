import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    services: [
      {
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Service',
          required: true,
        },
        date: {
          type: Date,
          required: false,
        },
        time: {
          type: String,
          required: true,
        },
        notes: {
          type: String,
          required: false,
        },
        staff: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;