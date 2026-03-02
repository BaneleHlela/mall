import express from "express"

import { 
    createPackage,
    deletePackage,
    getStorePackages,
    softDeletePackage,
    updatePackage,
    getPackageById,
    getAllPackages,
    purchasePackage,
    getUserPackages,
    updateUserPackageSessions,
    likePackage,
    unlikePackage,
} from "../controllers/PackageController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createPackage);
router.patch("/:id", updatePackage);
router.get("/store/:storeSlug", getStorePackages);
router.delete("/soft/:id", softDeletePackage);
router.delete("/:id", deletePackage);
router.get("/:id", getPackageById);
router.get('/', getAllPackages);
router.post("/:packageId/purchase", protectRoute, purchasePackage);
router.post("/:packageId/like", protectRoute, likePackage);
router.delete("/:packageId/like", protectRoute, unlikePackage);
router.get("/user/packages", protectRoute, getUserPackages);
router.patch("/user/package/:userPackageId/sessions", protectRoute, updateUserPackageSessions);

export default router;