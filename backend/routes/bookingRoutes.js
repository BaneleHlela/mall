import {
    makeBooking,
} from "../controllers/BookingController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

import express from "express";

const router = express.Router();

router.post("/", protectRoute, makeBooking);

export default router;