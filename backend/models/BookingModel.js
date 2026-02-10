import mongoose from 'mongoose';

/**
 * Each item represents ONE booked thing
 * (service, package, event, etc.)
*/
const bookingItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ['Service', 'Package'],
    required: true,
  },

  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'items.itemType',
  },

  startTime: {
    type: Date,
    required: true,
  },

  endTime: {
    type: Date,
    required: true,
  },

  // Optional but useful if you want dynamic endTime calculation
  duration: {
    type: Number, // minutes
  },

  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  notes: {
    type: String,
  },
});

/**
 * Main Booking schema
 */
const bookingSchema = new mongoose.Schema(
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

    /**
     * Useful for grouping bookings by day
     * (daily schedules, admin dashboards, analytics)
    */
    bookingDate: {
      type: Date,
      required: true,
      index: true,
    },

    items: {
      type: [bookingItemSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: 'A booking must contain at least one item',
      },
    },

    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Rejected', 'Cancelled'],
      default: 'Pending',
      index: true,
    },
    /**
     * Cancellation metadata
     */
    cancelledAt: {
      type: Date,
    },
    cancelledBy: {
      type: String,
      enum: ['User', 'Store', 'System'],
    },
    cancellationReason: {
      type: String,
    },
    /**
     * Optional reminders & notifications
     */
    reminderSent: {
      type: Boolean,
      default: false,
    },
    /**
     * Optional soft-delete
     * (very useful for audits & recovery)
     */
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);


/* Old Booking Schema */
// import mongoose from 'mongoose';

// const bookingSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     store: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Store',
//       required: true,
//     },
//     type: {
//       type: String,
//       enum: ['Service', 'Package'],
//       required: true,
//     },
//     services: [
//       {
//         service: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Service',
//           required: true,
//         },
//         date: {
//           type: Date,
//           required: false,
//         },
//         time: {
//           type: String,
//           required: true,
//         },
//         notes: {
//           type: String,
//           required: false,
//         },
//         staff: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'User',
//           required: true,
//         },
//       },
//     ],
//     packages: [
//       {
//         package: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Package',
//           required: true,
//         },
//         date: {
//           type: Date,
//           required: false,
//         },
//         time: {
//           type: String,
//           required: true,
//         },
//         notes: {
//           type: String,
//           required: false,
//         },
//         staff: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'User',
//           required: true,
//         },
//       },
//     ],
//     status: {
//       type: String,
//       enum: ['Pending', 'Rejected', 'Confirmed', 'Cancelled'],
//       default: 'Pending',
//     },
//   },
//   { timestamps: true }
// );

// const Booking = mongoose.model('Booking', bookingSchema);
// export default Booking;