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
  const userId = req.user._id;

  try {
    const orders = await Order.find({ user: userId })
      .populate({
        path: "items.product",
        select: "name images",
      })
      .populate({
        path: "store",
        select: "slug name thumbnail",
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
    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (deliveryStatus) order.deliveryStatus = deliveryStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

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
    const returnedOrders = orders.filter(order => order.deliveryStatus === 'Cancelled').length;

    const analytics = {
      totalOrders,
      totalOrderedItems,
      completedOrders,
      returnedOrders,
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
  const userId = req.user._id;

  try {
    // Check if user is admin of the store
    const store = await Store.findOne({ _id: storeId, owner: userId });
    if (!store) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to access this store's analytics",
      });
    }

    const orders = await Order.find({ store: storeId });

    const totalOrders = orders.length;
    const totalOrderedItems = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
    const completedOrders = orders.filter(order => order.deliveryStatus === 'Delivered').length;
    const returnedOrders = orders.filter(order => order.deliveryStatus === 'Cancelled').length;

    const analytics = {
      totalOrders,
      totalOrderedItems,
      completedOrders,
      returnedOrders,
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