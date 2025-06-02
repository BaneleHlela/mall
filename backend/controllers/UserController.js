import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import crypto from "crypto";


import { redis } from "../config/redis.js";
import { storeRefreshToken } from "../config/storeRefreshToken.js";
import { generateTokens } from "../config/generateTokens.js";
import { setCookies } from "../config/setCookies.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../emails/email.js";

import User from "../models/UserModel.js";



export const signup = expressAsyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
  
    const userAlreadyExists = await User.findOne({ email });
  
    if (userAlreadyExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
  
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
  
    await user.save();
  
    // authenticate
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);
    
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  
    // Exclude "verificationToken" as res
});
  

// Login a user
export const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
        const { accessToken, refreshToken } = generateTokens(user._id);
        
        await storeRefreshToken(user._id, refreshToken);
        setCookies(res, accessToken, refreshToken);

        user.lastLogin = new Date();
        await user.save();

        res.json({
          user: { ...user._doc }
        });
    } else {
        res.status(400).json({ message: "Invalid email or password" });
    }
});

// logout a user
export const logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			await redis.del(`refresh_token:${decoded.userId}`);
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


// forgot password
export const forgotPassword = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // Send email with reset link
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);


    res.status(200).json({ success: true, message: "Password reset link sent to your email" });
});

// reset password
export const resetPassword = expressAsyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
  
    if (!user) {
      res.status(400);
      throw new Error("Invalid or expired reset token");
    }
  
  
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
  
    await sendResetSuccessEmail(user.email);
  
    res.status(200).json({ success: true, message: "Password reset successful" });
});

// fetch all users
export const fetchAllUsers = expressAsyncHandler ( async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

// Get a user profile
export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// user login status
export const userLoginStatus = expressAsyncHandler(async (req, res) => {
    const accessToken = req.cookies.accessToken;
  
    if (!accessToken) {
      // 401 Unauthorized
      res.status(401).json({ message: "Not authorized, please login!" });
    }
    // verify the accessToken
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  
    if (decoded) {
      res.status(200).json(true);
    } else {
      res.status(401).json(false);
    }
});

// Update a user
export const updateUser = expressAsyncHandler( async (req, res) => {
    const { _id } = req.user;
    try {
        const updateUser = await User.findByIdAndUpdate(_id, {
            firstname: req.body?.firstname,
            lastname: req.body?.lastname,
            email: req.body?.email,
            mobile: req.body?.mobile
        }, {
            new: true,
        });
        res.json(updateUser)
    } catch (error) {
        throw new Error(error)
    }
});

// Delete a user
export const deleteUser = expressAsyncHandler( async (req, res) => {
    const { _id: id } = req.user;

    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser)
    } catch (error) {
        throw new Error(error)
    }
}
);

// Block a user
export const blockUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { isBlocked: true },
        { new: true } // Returns the updated user document
    );

    

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({ message: "User blocked successfully", user });
});

// Unblock a user
export const unblockUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { isBlocked: false },
        { new: true } // Returns the updated user document
    );

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({ message: "User unblocked successfully", user });
});


// email verification
export const verifyEmail = expressAsyncHandler(async (req, res) => {
    const { code } = req.body;
  
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
  
    if (!user) {
      res.status(400);
      throw new Error("Invalid or expired verification code");
    }
  
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
  
    await sendWelcomeEmail(user.email, user.firstName);
  
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
});
  

// check auth
export const checkAuth = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.userId).select("-password");
  
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
  
    res.status(200).json({ success: true, user });
});
  
export const refreshAccessToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

		if (storedToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000,
		});

		res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};