import Booking from '../models/BookingModel.js';
import Store from '../models/StoreModel.js';
import Service from '../models/ServiceModel.js';
import Package from '../models/PackageModel.js';
import UserPackage from '../models/UserPackage.js';
import { addMinutes, timeStringToDate, formatTime } from '../utils/helperFunctions.js';

export const makeBooking = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { store, items } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    if (!store || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or items array is empty' });
    }

    const now = new Date();

    for (const item of items) {
      if (!item.itemType || !item.item || !item.startTime || !item.staff) {
        return res.status(400).json({ message: 'Each item must have itemType, item, startTime, and staff' });
      }

      const bookingDateTime = new Date(item.startTime);

      if (isNaN(bookingDateTime.getTime())) {
        return res.status(400).json({ message: 'Invalid startTime format in items' });
      }

      if (bookingDateTime < now) {
        return res.status(400).json({ message: 'Cannot book a service in the past' });
      }

      // Validate itemType
      if (!['Service', 'Package'].includes(item.itemType)) {
        return res.status(400).json({ message: 'Invalid itemType. Must be Service or Package' });
      }
    }

    // Set bookingDate to the first item's date
    const bookingDate = new Date(items[0].startTime);

    const booking = new Booking({
      user: userId,
      store,
      bookingDate,
      items,
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Booking creation failed:', error);
    res.status(500).json({ message: 'Server error while creating booking' });
  }
};

// Make a booking using a user package (for package sessions)
export const makePackageBooking = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { userPackageId, store, date, time, staff, notes } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    if (!userPackageId || !store || !date || !time || !staff) {
      return res.status(400).json({ message: 'Missing required fields: userPackageId, store, date, time, and staff are required' });
    }

    // Check if user package exists and has sessions remaining
    const userPackage = await UserPackage.findById(userPackageId)
      .populate('package');

    if (!userPackage) {
      return res.status(404).json({ message: 'User package not found' });
    }

    if (userPackage.sessionsRemaining <= 0) {
      return res.status(400).json({ message: 'No sessions remaining on this package' });
    }

    if (userPackage.status !== 'active') {
      return res.status(400).json({ message: 'Package is not active' });
    }

    // Check expiry date
    if (userPackage.expiryDate && new Date(userPackage.expiryDate) < new Date()) {
      return res.status(400).json({ message: 'Package has expired' });
    }

    const now = new Date();
    const bookingDateTime = new Date(`${date}T${time}:00`);

    if (bookingDateTime < now) {
      return res.status(400).json({ message: 'Cannot book a session in the past' });
    }

    // Calculate end time based on package session duration
    const sessionDuration = userPackage.package.sessions?.duration || 60;
    const endTime = addMinutes(bookingDateTime, sessionDuration);

    const booking = new Booking({
      user: userId,
      store,
      bookingDate: bookingDateTime,
      items: [{
        itemType: 'Package',
        item: userPackage.package._id,
        startTime: bookingDateTime,
        endTime: endTime,
        duration: sessionDuration,
        staff: staff,
        notes: notes || '',
      }],
    });

    const savedBooking = await booking.save();

    // Update user package sessions
    userPackage.sessionsRemaining -= 1;
    await userPackage.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Package booking creation failed:', error);
    res.status(500).json({ message: 'Server error while creating package booking' });
  }
};


export const updateBooking = async (req, res) => {
  try {
    const userId = (req).user?.id || (req).user?._id;
    const bookingId = req.params.id;
    const { items, status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    // Validate new items structure if provided
    if (items) {
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Items must be a non-empty array' });
      }

      for (const item of items) {
        if (!item.itemType || !item.item || !item.startTime || !item.staff) {
          return res.status(400).json({ message: 'Each item must have itemType, item, startTime, and staff' });
        }
      }

      booking.items = items;
      booking.bookingDate = new Date(items[0].startTime);
    }

    if (status) {
      const validStatuses = ['Pending', 'Confirmed', 'Rejected', 'Cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      booking.status = status;
    }

    const updatedBooking = await booking.save();
    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Server error while updating booking' });
  }
};


// Get store bookings
export const getStoreBookings = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    if (!storeId) {
      return res.status(400).json({ message: 'Store ID is required' });
    }

    const bookings = await Booking.find({ store: storeId })
      .populate('user', 'name email')
      .populate('items.item', 'name price duration')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching store bookings:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};


export const getStaffBookings = async (req, res) => {
  try {
    const staffId = req.params.staffId;

    if (!staffId) {
      return res.status(400).json({ message: 'Staff ID is required' });
    }

    const bookings = await Booking.find({
      'items.staff': staffId,
    })
      .populate('user', 'name email')
      .populate('store', 'name')
      .populate('items.item', 'name duration price')
      .populate('items.staff', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching staff bookings:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};


export const getUserBookings = async (req, res) => {
  try {
    const userId = (req).user?._id || (req).user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const bookings = await Booking.find({ user: userId })
      .populate('store', 'name')
      .populate('items.item', 'name price duration')
      .populate('items.staff', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};


// Get available booking times for services or packages
export const getAvailableBookingTimes = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { itemId, itemType, staffId, date } = req.query;

    console.log(req.query, storeId);

    if (!storeId || !itemId || !itemType || !date) {
      return res.status(400).json({ message: 'storeId, itemId, itemType, and date are required' });
    }

    const selectedDate = new Date(date);
    const dayKey = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    // Fetch Store
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    let item, duration;
    if (itemType === 'Service') {
      item = await Service.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Service not found' });
      }
      duration = item.duration;
    } else if (itemType === 'Package') {
      const userPackage = await UserPackage.findById(itemId);
      if (!userPackage) {
        return res.status(404).json({ message: 'Package not found' });
      }
      // Get the actual package from the user package
      item = await Package.findById(userPackage.package);
      if (!item) {
        return res.status(404).json({ message: 'Package not found' });
      }
      duration = item.sessions?.duration || 60;
    } else {
      return res.status(400).json({ message: 'Invalid itemType. Must be Service or Package' });
    }

    console.log(store, item);

    const dayConfig = store.operationTimes?.[dayKey];
    if (!dayConfig || dayConfig.closed) {
      return res.status(200).json({ [date]: [] }); // Store closed that day
    }

    const adjustedDuration = duration >= 40 ? 60 : Math.ceil(duration / 30) * 30;

    // Generate time slots
    let start = timeStringToDate(selectedDate, dayConfig.start);
    const end = timeStringToDate(selectedDate, dayConfig.end);
    const allSlots = [];

    while (addMinutes(start, adjustedDuration) <= end) {
      allSlots.push(formatTime(start));
      start = addMinutes(start, 30);
    }

    // Get bookings for that date
    const bookings = await Booking.find({
      store: storeId,
      'items.startTime': {
        $gte: new Date(`${date}T00:00:00`),
        $lt: new Date(`${date}T23:59:59`),
      },
    }).populate('items.item');

    console.log('Bookings for date:', bookings);

    const bookedTimes = [];
    
    bookings.forEach((booking) => {
      booking.items.forEach((item) => {
        const isSameDate = new Date(item.startTime).toDateString() === selectedDate.toDateString();
        const hasMatchingPerformer = !staffId || (
          item.staff?.toString() === staffId
        );
        if (isSameDate && hasMatchingPerformer) {
          const serviceStart = new Date(item.startTime);
          
          const bookedDur = item.duration >= 40
            ? 60
            : Math.ceil(item.duration / 30) * 30;
  
          let blockTime = new Date(serviceStart);
          for (let i = 0; i < bookedDur; i += 30) {
            bookedTimes.push(formatTime(blockTime));
            blockTime = addMinutes(blockTime, 30);
          }
        }
      });
    });
    
    const availableSlots = allSlots.filter((slot) => !bookedTimes.includes(slot));

    return res.status(200).json({ [date]: availableSlots });
  } catch (err) {
    console.error('Error in getAvailableBookingTimes:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
