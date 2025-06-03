import express from "express"

import { 
    createPackage,
    deletePackage,
    getStorePackages,
    updatePackage,
} from "../controllers/PackageController.js";

const router = express.Router();

router.post("/", createPackage);
router.patch("/:id", updatePackage);
router.get("/store/:storeId", getStorePackages);
router.delete("/:id", deletePackage);

export default router;