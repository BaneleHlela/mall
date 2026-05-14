import express from "express";
import { createDriver, getDriverProfile, updateDriverProfile, uploadDriverDocuments } from "../controllers/DriverController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { uploadSingleFile, uploadDriverDocumentsMiddleware } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// All driver routes require authentication
router.use(protectRoute);

// Create driver account
router.post("/create", uploadDriverDocumentsMiddleware, createDriver);

// Get driver profile
router.get("/profile", getDriverProfile);

// Update driver profile
router.put("/profile", updateDriverProfile);

// Upload driver documents
router.post("/documents", uploadSingleFile('document'), uploadDriverDocuments);

export default router;