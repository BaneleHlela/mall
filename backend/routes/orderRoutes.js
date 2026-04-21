import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  updateOrder,
  cancelOrder,
  getStoreOrders,
  getOrderAnalytics
} from "../controllers/OrderController.js";

const router = express.Router();

// Order routes
router.post("/", protectRoute, createOrder);
router.get("/", protectRoute, getUserOrders);
router.get("/:orderId", protectRoute, getOrderById);
router.put("/:orderId", protectRoute, updateOrder);
router.put("/:orderId/status", protectRoute, updateOrderStatus);
router.put("/:orderId/cancel", protectRoute, cancelOrder);

// Store admin routes
router.get("/store/:storeId", protectRoute, getStoreOrders);
router.get("/analytics/:storeId", protectRoute, getOrderAnalytics);

export default router;