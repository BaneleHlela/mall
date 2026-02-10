import {
    makeBooking,
    makePackageBooking,
    updateBooking,
    getStaffBookings,
    getStoreBookings,
    getUserBookings,
    getAvailableBookingTimes,
} from "../controllers/BookingController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

import express from "express";

const router = express.Router();

router.post("/", protectRoute, makeBooking);
router.post("/package", protectRoute, makePackageBooking);
router.put('/:id', protectRoute, /* isAdmin,*/ updateBooking);
router.get("/store/:storeId", protectRoute, /*isStoreAdmin,*/ getStoreBookings); 
router.get('/staff/:staffId', getStaffBookings);
router.get('/user', protectRoute, getUserBookings);
router.get('/availability/:storeId', getAvailableBookingTimes);

export default router;
