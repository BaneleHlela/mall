import express from "express";
import {
    createLayoutConfig,
    getLayoutConfig,
    updateLayoutConfig,
    deleteLayoutConfig,
} from "../controllers/StoreLayoutController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", /*protectRoute,*/ createLayoutConfig);
router.patch('/:layoutId', /*protectRoute,*/ /*isAdmin,*/ updateLayoutConfig);
router.put('/:layoutId', /*protectRoute,*/ /*isAdmin,*/ updateLayoutConfig);
router.get('/:layoutId', /*protectRoute,*/ getLayoutConfig);
router.delete('/:layoutId', /*protectRoute,*/ deleteLayoutConfig);

export default router; 