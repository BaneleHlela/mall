import express from "express";
import {
    createPoster,
    fetchStorePosters,
} from "../controllers/PosterContoller.js"

const router = express.Router();

router.post("/", createPoster);
router.get("/store/:storeId", fetchStorePosters);

export default router;