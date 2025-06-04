import express from "express";

import { 
    protectRoute,
} from "../middlewares/authMiddleware.js";
import { 
    addStore,
    getStoresByOwner,
    getStore,
    getStores,
    uploadStoreLogo,
    deleteStoreLogo,
    getStoreImages,
    uploadStoreGalleryImage,
    deleteStoreGalleryImage,
    editStore,
} from "../controllers/StoreController.js";
import { uploadSingleFile } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post('/add', protectRoute, addStore);
router.get("/my-stores", protectRoute, getStoresByOwner);
router.get("/:storeId", getStore);
router.get('/', getStores);
router.put('/edit/:storeId', protectRoute, editStore);

router.put("/:storeId/logo", uploadSingleFile("logo"), uploadStoreLogo);
router.delete('/:storeId/logo', deleteStoreLogo);

router.get('/:storeId/gallery', getStoreImages); 
router.put('/:storeId/gallery', uploadSingleFile("image"), uploadStoreGalleryImage);
router.delete('/:storeId/gallery', deleteStoreGalleryImage);



export default router;