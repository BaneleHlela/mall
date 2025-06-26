import express from "express";
import { getSections, uploadStoreSection } from "../controllers/SectionController.js";
import { uploadSectionImages } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", uploadSectionImages, uploadStoreSection);
router.get("/", getSections);

export default router;
