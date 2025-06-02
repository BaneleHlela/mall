import express from "express";

import { 
    isStoreAdmin,
    protectRoute,
} from "../middlewares/authMiddleware.js";
import {
    editStore,
    deleteStore,
    linkLayoutToStore
} from "../controllers/StoreDashboardController.js"
const router = express.Router();

router.patch('/edit/:storeId', protectRoute, isStoreAdmin, editStore);
router.delete('/delete/:storeId', protectRoute, isStoreAdmin, deleteStore);
router.patch('/link-layout/:storeId', protectRoute, isStoreAdmin, linkLayoutToStore);

export default router;