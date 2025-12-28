import express from "express";
import { getSections, uploadStoreSection, copySectionFromLayout, addSectionFromLayout } from "../controllers/SectionController.js";
import { uploadSectionImages } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", uploadSectionImages, uploadStoreSection);
router.get("/", getSections);
router.post("/copy", copySectionFromLayout);
router.post("/add", addSectionFromLayout);

export default router;
