import Booking from '../models/BookingModel.js';

export const makeBooking = async (req, res ) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { store, services } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    if (!store || !services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or services array is empty' });
    }

    // Validate each service entry
    for (const s of services) {
      if (!s.service || !s.date || !s.time) {
        return res.status(400).json({ message: 'Each service must have service, date, and time' });
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

