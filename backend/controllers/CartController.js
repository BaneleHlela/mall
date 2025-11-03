import mongoose from "mongoose";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

export const addToCart = async (req, res) => {
  const { storeId, productId, variation, quantity = 1, specialRequest = "" } = req.body;
  const userId = req.user._id;

  try {
    // ✅ Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // ✅ Determine correct price based on variation
    let selectedPrice = product.price || 0;
    if (variation && product.prices?.length > 0) {
      const matchedVariation = product.prices.find(p => p.variation === variation);
      if (matchedVariation) {
        selectedPrice = matchedVariation.amount;
      } else {
        return res.status(400).json({ success: false, message: "Invalid variation selected" });
      }
    }

    // ✅ Find user's cart for this store
    let cart = await Cart.findOne({ user: userId, store: storeId });

    if (cart) {
      // Check if product with the same variation already exists
      const existingItem = cart.items.find(
        item =>
          item.product.toString() === productId &&
          item.variation === (variation || null)
      );

      if (existingItem) {
        // Update quantity and request
        existingItem.quantity += quantity;
        existingItem.specialRequest = specialRequest;
      } else {
        // Add new item
        cart.items.push({
          product: productId,
          variation: variation || null,
          price: selectedPrice,
          quantity,
          specialRequest,
        });
      }
    } else {
      // Create new cart for this store
      cart = new Cart({
        user: userId,
        store: storeId,
        items: [
          {
            product: productId,
            variation: variation || null,
            price: selectedPrice,
            quantity,
            specialRequest,
          },
        ],
        totalPrice: 0,
      });
    }

    // ✅ Recalculate total price based on stored item prices
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserCart = async (req, res) => {
  const userId = req.user._id;
  const { storeId } = req.query;

  try {
    // Build query
    const query = { user: userId };
    if (storeId) query.store = storeId;

    // ✅ Fetch and populate product details
    const carts = await Cart.find(query)
      .populate({
        path: "items.product",
        select: "name images price prices", // only essential fields
      })
      .lean(); // optional: returns plain JS objects for lighter payload

    if (!carts || carts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No cart found for the user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      carts,
    });
  } catch (error) {
    console.error("Error fetching user cart:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const updateCart = async (req, res) => {
  const { storeId, productId, quantity, specialRequest } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId, store: storeId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the specified store",
      });
    }

    const productInCart = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!productInCart) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart",
      });
    }

    if (quantity !== undefined) productInCart.quantity = quantity;
    if (specialRequest !== undefined)
      productInCart.specialRequest = specialRequest;

    // Remove items with zero quantity (optional)
    cart.items = cart.items.filter((item) => item.quantity > 0);

    // ✅ Recalculate total safely
    const updatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await mongoose.model("Product").findById(item.product);
        const price = product?.price || 0;
        return item.quantity * price;
      })
    );

    cart.totalPrice = updatedItems
      .filter((v) => !isNaN(v))
      .reduce((acc, price) => acc + price, 0);

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteUserCart = async (req, res) => {
  const userId = req.user._id; // Extract user ID from the request
  const { storeId } = req.params; // Extract store ID from route parameters

  try {
    // Find and delete the cart for the user and store
    const cart = await Cart.findOneAndDelete({ user: userId, store: storeId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the specified store",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};