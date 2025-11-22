import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import crypto from "crypto";


import { redis } from "../config/redis.js";
import { storeRefreshToken } from "../config/storeRefreshToken.js";
import { generateTokens } from "../config/generateTokens.js";
import { setCookies } from "../config/setCookies.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../emails/email.js";
import User from "../models/UserModel.js";
import Store from "../models/StoreModel.js";
import { uploadToUploads, uploadsBucket } from "../config/gcsClient.js";

// Create a user 
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
    
    //await sendVerificationEmail(user.email, verificationToken);

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

export const manageAvatar = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; // from protectRoute
    const file = req.file;
    const { remove } = req.body;


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    // DELETE AVATAR
    if (remove === "true" || remove === true) {
      if (user.avatar && !user.avatar.includes("default-avatar")) {
        try {
          const oldPath = user.avatar.split(`the-mall-uploads-giza/`)[1];
          await uploadsBucket.file(oldPath).delete();
          console.log("Old avatar deleted:", oldPath);
        } catch (error) {
          console.error("Failed deleting old avatar:", error.message);
        }
      }

      user.avatar = "default-avatar-url.jpg";
      await user.save();

      return res.status(200).json({
        message: "Avatar removed successfully",
        avatar: user.avatar,
      });
    }

    // ADD / REPLACE AVATAR
    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    // If a custom avatar exists → delete it first
    if (user.avatar && !user.avatar.includes("default-avatar")) {
      try {
        const oldPath = user.avatar.split(`the-mall-uploads-giza/`)[1];
        await uploadsBucket.file(oldPath).delete();
        console.log("Old avatar deleted:", oldPath);
      } catch (error) {
        console.error("Failed deleting old avatar:", error.message);
      }
    }

    const extension = file.originalname.split(".").pop();
    const fileName = `${user.username}.${extension}`;

    const destination = `users/${user.username}/avatar/${fileName}`;

    // Upload new avatar
    await uploadToUploads(file.buffer, destination);

    // Build Google Cloud public URL
    const publicUrl = `https://storage.googleapis.com/the-mall-uploads-giza/${destination}`;
    
    user.avatar = publicUrl;
    await user.save();
    
    res.status(200).json({
      message: "Avatar updated successfully",
      avatar: publicUrl,
    });
  } catch (error) {
    console.error("Manage avatar error:", error);
    res.status(500).json({ message: "Failed to manage avatar" });
  }
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

// Get user addresses
export const getAddresses = expressAsyncHandler(async (req, res) => {
	try {
		const { _id } = req.user;
		const user = await User.findById(_id).select('locations');

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json(user.locations || []);
	} catch (error) {
		console.error('Error fetching user addresses:', error);
		res.status(500).json({ message: 'Server error while fetching addresses' });
	}
});

// Search By Username
export const searchUsersByUsername = expressAsyncHandler(async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ message: 'Query required' });
  const users = await User.find({ username: { $regex: `^${q}`, $options: 'i' } })
    .select('username firstName lastName');
  res.json(users);
});

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
export const updateUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Update basic fields if provided
    if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;
    if (req.body.email) user.email = req.body.email;
    if (req.body.mobile) user.mobile = req.body.mobile;

    // Append new locations if provided
    if (req.body.locations && Array.isArray(req.body.locations) && req.body.locations.length === 1 ) {
      req.body.locations.forEach((loc) => {
        if (loc.lat && loc.lng && loc.address) {
          user.locations.push({
            nickname: loc.nickname || '',
            lat: loc.lat,
            lng: loc.lng,
            address: loc.address,
          });
        }
      });
    }

    // Update the whole array if locations have been rearranged
    if (req.body.locations && Array.isArray(req.body.locations) && req.body.locations.length > 1 ) {
      user.locations = req.body.locations;
    }

    // Update favoriteStores and store.likes
    if (req.body.favoriteStore) {
      const storeId = req.body.favoriteStore;
      const userId = user._id;

      // Check if the store is already in user's favorites
      const storeIndex = user.favoriteStores.findIndex(
        (store) => store.toString() === storeId
      );

      if (storeIndex === -1) {
        // Add the store to favoriteStores
        user.favoriteStores.push(storeId);

        // Increment likes.count and add the user to likes.users array
        await Store.findByIdAndUpdate(
          storeId,
          {
            $inc: { "likes.count": 1 },
            $addToSet: { "likes.users": userId } // prevents duplicates
          },
          { new: true }
        );

        console.log("Store liked");
      } else {
        // Remove the store from favoriteStores
        user.favoriteStores.splice(storeIndex, 1);

        // Decrement likes.count and remove the user from likes.users array
        await Store.findByIdAndUpdate(
          storeId,
          {
            $inc: { "likes.count": -1 },
            $pull: { "likes.users": userId }
          },
          { new: true }
        );

        console.log("Store unliked");
      }

      // Save the updated user document
      await user.save();
    }


    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500);
    throw new Error(error.message || "Failed to update user");
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

// refresh access token
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