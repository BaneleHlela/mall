import mongoose from "mongoose";
import Order from "../models/OrderModel.js";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";
import Store from "../models/StoreModel.js";
import Counter from "../models/schemas/counterSchema.js"


const getNextSequence = async (name) => {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  return counter.value;
};

const createOrderId = async () => {
  const seq = await getNextSequence("order");
  return `ORD-${seq}`;
};

const canModifyOrder = async (order, userId) => {
  if (!order) return false;
  if (order.user?.toString() === userId.toString()) return true;

  const store = await Store.findById(order.store).select('team');
  if (!store) return false;

  return store.team.some(member => {
    return member?.member?.toString() === userId.toString() && ['owner', 'manager', 'admin'].includes(member.role);
  });
};

export const createOrder = async (req, res) => {
  const { storeId, paymentMethod, deliveryOption, shippingAddress } = req.body;
  const userId = req.user._id;

  try {
    // Find user's cart for this store
    const cart = await Cart.findOne({ user: userId, store: storeId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Create order from cart items
    const orderItems = cart.items.map(item => ({
      product: item.product,
      variation: item.variation,
      specialRequest: item.specialRequest,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalPrice = cart.totalPrice;

    // Generate orderId
    const orderId = await createOrderId();

    const order = new Order({
      user: userId,
      store: storeId,
      orderId,
      items: orderItems,
      totalPrice,
      paymentMethod,
      deliveryOption,
      shippingAddress,
    });

    await order.save();

    // Clear the cart after order creation
    await Cart.findOneAndDelete({ user: userId, store: storeId });

    // Populate product details for response
    await order.populate("items.product", "name images");

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  console.log("Fetching user orders for user:", req.user._id);
  const userId = req.user._id;

  try {
    const orders = await Order.find({ user: userId })
      .populate({
        path: "items.product",
        select: "name images",
      })
      .populate({
        path: "store",
        select: "slug name thumbnails",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user._id;

  try {
    const order = await Order.findOne({ _id: orderId, user: userId })
      .populate({
        path: "items.product",
        select: "name images price prices",
      })
      .populate({
        path: "store",
        select: "slug name thumbnail",
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { deliveryStatus, paymentStatus } = req.body;
  const userId = req.user._id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const isAuthorized = await canModifyOrder(order, userId);
    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this order",
      });
    }

    if (deliveryStatus) order.deliveryStatus = deliveryStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();
    await order.populate('items.product', 'name images');

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { deliveryStatus, paymentStatus } = req.body;
  const userId = req.user._id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const isAuthorized = await canModifyOrder(order, userId);
    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this order",
      });
    }

    if (deliveryStatus) order.deliveryStatus = deliveryStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();
    await order.populate('items.product', 'name images');

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user._id;

  try {
    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.deliveryStatus !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled at this stage",
      });
    }

    order.deliveryStatus = 'Cancelled';
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStoreOrders = async (req, res) => {
  const { storeId } = req.params;
  const userId = req.user._id;

  try {
    // Check if user is admin of the store
    const store = await Store.findOne({ _id: storeId});
    if (!store) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to access this store's orders",
      });
    }

    const orders = await Order.find({ store: storeId })
      .populate({
        path: "items.product",
        select: "name images",
      })
      .populate({
        path: "user",
        select: "name email",
      })
      .sort({ createdAt: -1 });

    // Calculate analytics
    const totalOrders = orders.length;
    const totalOrderedItems = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
    const completedOrders = orders.filter(order => order.deliveryStatus === 'Delivered').length;
    const returnedOrders = orders.filter(order => order.deliveryStatus === 'Returned').length;
    const cancelledOrders = orders.filter(order => order.deliveryStatus === 'Cancelled').length;

    const analytics = {
      totalOrders,
      totalOrderedItems,
      completedOrders,
      returnedOrders,
      cancelledOrders
    };

    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      orders,
      analytics,
    });
  } catch (error) {
    console.error("Error fetching store orders:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderAnalytics = async (req, res) => {
  const { storeId } = req.params;
  const { timeframe = 'all-time' } = req.query;
  const userId = req.user._id;

  try {
    // Check if user is admin of the store
    const store = await Store.findOne({ _id: storeId, /*owner: userId */ });
    if (!store) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to access this store's analytics",
      });
    }

    // Calculate date ranges for current and previous periods
    const now = new Date();
    let currentStartDate = null;
    let previousStartDate = null;
    let previousEndDate = null;
    
    if (timeframe === 'today') {
      currentStartDate = new Date();
      currentStartDate.setHours(0, 0, 0, 0);
      previousStartDate = new Date();
      previousStartDate.setDate(now.getDate() - 1);
      previousStartDate.setHours(0, 0, 0, 0);
      previousEndDate = new Date();
      previousEndDate.setDate(now.getDate() - 1);
      previousEndDate.setHours(23, 59, 59, 999);
    } else if (timeframe === 'week') {
      const day = now.getDay();
      const diff = now.getDate() - day;
      currentStartDate = new Date();
      currentStartDate.setDate(diff);
      currentStartDate.setHours(0, 0, 0, 0);
      
      previousStartDate = new Date();
      previousStartDate.setDate(diff - 7);
      previousStartDate.setHours(0, 0, 0, 0);
      previousEndDate = new Date();
      previousEndDate.setDate(diff - 1);
      previousEndDate.setHours(23, 59, 59, 999);
    } else if (timeframe === 'month') {
      currentStartDate = new Date();
      currentStartDate.setDate(1);
      currentStartDate.setHours(0, 0, 0, 0);
      
      previousStartDate = new Date();
      previousStartDate.setMonth(now.getMonth() - 1, 1);
      previousStartDate.setHours(0, 0, 0, 0);
      previousEndDate = new Date();
      previousEndDate.setMonth(now.getMonth(), 0);
      previousEndDate.setHours(23, 59, 59, 999);
    } else if (timeframe === 'all-time') {
      // For all-time, no date filtering, and compare with empty previous period
      currentStartDate = null;
      previousStartDate = null;
      previousEndDate = null;
    }

    // Fetch current period orders
    let currentOrders;
    if (currentStartDate) {
      currentOrders = await Order.find({ 
        store: storeId,
        createdAt: { $gte: currentStartDate }
      });
    } else {
      // all-time: fetch all orders for the store
      currentOrders = await Order.find({ store: storeId });
    }

    // Fetch previous period orders
    let previousOrders = [];
    if (previousStartDate && previousEndDate) {
      previousOrders = await Order.find({ 
        store: storeId,
        createdAt: { $gte: previousStartDate, $lte: previousEndDate }
      });
    }

    // Calculate current period metrics
    const totalOrders = currentOrders.length;
    const totalOrderedItems = currentOrders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
    const completedOrders = currentOrders.filter(order => order.deliveryStatus === 'Delivered').length;
    const returnedOrders = currentOrders.filter(order => order.deliveryStatus === 'Returned').length;
    const cancelledOrders = currentOrders.filter(order => order.deliveryStatus === 'Cancelled').length;

    // Calculate previous period metrics
    const prevTotalOrders = previousOrders.length;
    const prevTotalOrderedItems = previousOrders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
    const prevCompletedOrders = previousOrders.filter(order => order.deliveryStatus === 'Delivered').length;
    const prevCancelledOrders = previousOrders.filter(order => order.deliveryStatus === 'Cancelled').length;

    // Calculate percentage changes
    const calculatePercentage = (current, previous) => {
      console.log(`Calculating percentage change: current=${current}, previous=${previous}`);
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const analytics = {
      totalOrders,
      totalOrderedItems,
      completedOrders,
      returnedOrders,
      cancelledOrders,
      percentages: {
        totalOrders: calculatePercentage(totalOrders, prevTotalOrders),
        totalOrderedItems: calculatePercentage(totalOrderedItems, prevTotalOrderedItems),
        completedOrders: calculatePercentage(completedOrders, prevCompletedOrders),
        cancelledOrders: calculatePercentage(cancelledOrders, prevCancelledOrders),
      }
    };

    return res.status(200).json({
      success: true,
      message: "Analytics retrieved successfully",
      analytics,
    });
  } catch (error) {
    console.error("Error fetching order analytics:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};