import express from "express";
import {
    createPoster,
    fetchStorePosters,
    fetchPosterById
} from "../controllers/PosterContoller.js"

const router = express.Router();

router.post("/", createPoster);

router.get("/:posterId", fetchPosterById);
router.get("/store/:storeId", fetchStorePosters);

export default router;