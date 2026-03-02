import express from "express";


import { signup, login, logout,
    forgotPassword, resetPassword, fetchAllUsers,
    getProfile, getAddresses, userLoginStatus, updateUser,
    deleteUser, blockUser, unblockUser,
    verifyEmail, checkAuth, refreshAccessToken,
    searchUsersByUsername, manageAvatar
} from "../controllers/UserController.js";
import { checkBlocked, isAdmin, protectRoute } from "../middlewares/authMiddleware.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { uploadSingleFile } from "../middlewares/uploadMiddleware.js";

const router = express.Router();


router.post("/signup", signup);
router.put("/avatar", protectRoute, uploadSingleFile('avatar'), manageAvatar);
router.post("/login", checkBlocked, login);
router.get("/check-auth", verifyToken, checkAuth);
router.post("/logout", logout);
router.get("/profile", protectRoute, getProfile);
router.get("/addresses", protectRoute, getAddresses);
router.put("/edit-user", protectRoute, updateUser);
router.get("/login-status", userLoginStatus);
router.post("/verify-email", verifyEmail);
router.get('/search-users', /*protectRoute, isAdmin,*/ searchUsersByUsername);

router.delete("/", protectRoute, deleteUser);

router.post("/refresh-token", refreshAccessToken);

router.get("/all-users", protectRoute, isAdmin, fetchAllUsers);
router.put("/block-user/:id", protectRoute, isAdmin, blockUser);
router.put("/unblock-user/:id", protectRoute, isAdmin, unblockUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router