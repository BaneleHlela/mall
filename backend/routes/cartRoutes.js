import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { addToCart, getUserCart, deleteUserCart, updateCart } from "../controllers/CartController.js";

const router = express.Router();

router.post("/", protectRoute, addToCart);
router.get("/", protectRoute, getUserCart);
router.put("/", protectRoute, updateCart);
router.delete("/:storeId", protectRoute, deleteUserCart);


export default router;