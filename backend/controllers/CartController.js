import mongoose from "mongoose";
import Cart from "../models/CartModel.js";

export const addToCart = async (req, res) => {
  const { storeId, productId, quantity = 1, specialRequest = "" } = req.body;
  const  userId  = req.user._id;
  console.log(req.user._id);
  try {
    // Find the cart for the user and store
    let cart = await Cart.findOne({ user: userId, store: storeId });

    if (cart) {
      // Check if the product already exists in the cart
      const productInCart = cart.items.find((item) => item.product.toString() === productId);

      if (productInCart) {
        // Update the quantity and special request if the product already exists
        productInCart.quantity += quantity;
        productInCart.specialRequest = specialRequest;
      } else {
        // Add the product to the cart
        cart.items.push({
          product: productId,
          quantity,
          specialRequest,
        });
      }
    } else {
      // Create a new cart for the user and store
      cart = new Cart({
        user: userId,
        store: storeId,
        items: [
          {
            product: productId,
            quantity,
            specialRequest,
          },
        ],
        totalPrice: 0, // Initialize total price
      });
    }

    // Calculate the total price
    const updatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await mongoose.model("Product").findById(item.product);
        return item.quantity * product.price;
      })
    );
    cart.totalPrice = updatedItems.reduce((acc, price) => acc + price, 0);

    // Save the cart
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserCart = async (req, res) => {
  const userId = req.user._id; // Extract user ID from the request
  const { storeId } = req.query; // Optional store filter from query parameters

  try {
    // Build the query object
    const query = { user: userId };
    if (storeId) {
      query.store = storeId; // Add store filter if provided
    }

    // Find the cart(s) for the user (and optionally the store)
    const carts = await Cart.find(query);

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
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateCart = async (req, res) => {
  const { storeId, productId, quantity, specialRequest } = req.body;
  const userId = req.user._id; // Extract user ID from the request

  try {
    // Find the cart for the user and store
    const cart = await Cart.findOne({ user: userId, store: storeId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the specified store",
      });
    }

    // Find the product in the cart
    const productInCart = cart.items.find((item) => item.product.toString() === productId);

    if (!productInCart) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart",
      });
    }

    // Update the product details
    if (quantity !== undefined) {
      productInCart.quantity = quantity; // Update quantity
    }
    if (specialRequest !== undefined) {
      productInCart.specialRequest = specialRequest; // Update special request
    }

    // Recalculate the total price
    const updatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await mongoose.model("Product").findById(item.product);
        return item.quantity * product.price;
      })
    );
    cart.totalPrice = updatedItems.reduce((acc, price) => acc + price, 0);

    // Save the updated cart
    await cart.save();

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