import express from "express";
import { trackVisit, getVisitStats } from "../controllers/VisitController.js";


const router = express.Router();

router.post("/track", trackVisit);
router.get("/stats/:storeId", getVisitStats);

export default router;