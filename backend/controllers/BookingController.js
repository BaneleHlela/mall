import Booking from '../models/BookingModel.js';
import Store from '../models/StoreModel.js';
import Service from '../models/ServiceModel.js';
import { addMinutes, timeStringToDate, formatTime } from '../utils/helperFunctions.js';

export const makeBooking = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { store, services } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    if (!store || !services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or services array is empty' });
    }

    const now = new Date();

    for (const s of services) {
      if (!s.service || !s.date || !s.time) {
        return res.status(400).json({ message: 'Each service must have service, date, and time' });
      }

      // Combine date and time into a Date object
      const bookingDateTime = new Date(`${s.date}T${s.time}:00`);

      if (isNaN(bookingDateTime.getTime())) {
        return res.status(400).json({ message: 'Invalid date or time format in services' });
      }

      if (bookingDateTime < now) {
        return res.status(400).json({ message: 'Cannot book a service in the past' });
      }
    }

    const booking = new Booking({
      user: userId,
      store,
      services,
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Booking creation failed:', error);
    res.status(500).json({ message: 'Server error while creating booking' });
  }
};


export const updateBooking = async (req, res) => {
  try {
    const userId = (req).user?.id || (req).user?._id;
    const bookingId = req.params.id;
    const { services, status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    // Optionally validate new services structure if provided
    if (services) {
      if (!Array.isArray(services) || services.length === 0) {
        return res.status(400).json({ message: 'Services must be a non-empty array' });
      }

      for (const s of services) {
        if (!s.service || !s.date || !s.time) {
          return res.status(400).json({ message: 'Each service must have service, date, and time' });
        }
      }

      booking.services = services;
    }

    if (status) {
      const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];
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
      .populate('user', 'name email') // populate user info
      //.populate('services.service', 'name price duration') // populate service info
      .sort({ createdAt: -1 }); // optional: most recent first

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
      'services.staff': staffId,
    })
      .populate('user', 'name email') // who booked
      .populate('store', 'name') // which store
      //.populate('services.service', 'name duration price') // what services
      .populate('services.staff', 'name email') // staff info
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
      .populate('services.service', 'name duration price')
      .populate('services.staff', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};



export const getAvailableBookingTimes = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { serviceId, staffId, date } = req.query;

    if (!storeId || !serviceId || !date) {
      return res.status(400).json({ message: 'storeId, serviceId, and date are required' });
    }

    const selectedDate = new Date(date);
    const dayKey = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase(); // e.g. 'monday'
    // Fetch Store and Service
    const store = await Store.findById(storeId);
    const service = await Service.findById(serviceId);
    if (!store || !service) {
      return res.status(404).json({ message: 'Store or Service not found' });
    }

    const dayConfig = store.operationTimes?.[dayKey];
    if (!dayConfig || dayConfig.closed) {
      return res.status(200).json({ [date]: [] }); // Store closed that day
    }

    const rawDuration = service.duration;
    const duration = rawDuration >= 40 ? 60 : Math.ceil(rawDuration / 30) * 30;

    // Generate time slots
    let start = timeStringToDate(selectedDate, dayConfig.start);
    const end = timeStringToDate(selectedDate, dayConfig.end);
    const allSlots = [];


    while (addMinutes(start, duration) <= end) {
      allSlots.push(formatTime(start));
      start = addMinutes(start, 30);
    }


    // Get bookings for that date
    const bookings = await Booking.find({
      store: storeId,
      services: {
        $elemMatch: {
          date: new Date(date),
          ...(staffId && { staff: staffId }),
        },
      },
    }).populate('services.service');

    
    //console.log('Bookings for date:', bookings);
    // console.log(new Date (date))

    const bookedTimes = [];
    
    bookings.forEach((booking) => {
      booking.services.forEach((svc) => {
        const isSameDate = new Date(svc.date).toDateString() === selectedDate.toDateString();
        const hasMatchingPerformer = !staffId || (
          svc.service.performers &&
          svc.service.performers.some((performer) => performer.user?.toString() === staffId)
        );
        if (isSameDate && hasMatchingPerformer) {
          const serviceStart = timeStringToDate(selectedDate, svc.time);
          
          const bookedDur = svc.service?.duration >= 40
            ? 60
            : Math.ceil(svc.service?.duration / 30) * 30;
    
    
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

