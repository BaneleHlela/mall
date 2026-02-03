import express from "express"

import { 
    createPackage,
    deletePackage,
    getStorePackages,
    softDeletePackage,
    updatePackage,
    getPackageById,
    getAllPackages,
} from "../controllers/PackageController.js";

const router = express.Router();

router.post("/", createPackage);
router.patch("/:id", updatePackage);
router.get("/store/:storeSlug", getStorePackages);
router.delete("/soft/:id", softDeletePackage);
router.delete("/:id", deletePackage);
router.get("/:id", getPackageById);
router.get('/', getAllPackages);

export default router;