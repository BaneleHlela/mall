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
router.get("/user/packages", protectRoute, getUserPackages);
router.patch("/user/package/:userPackageId/sessions", protectRoute, updateUserPackageSessions);

export default router;