import express from "express";

import { 
    protectRoute,
} from "../middlewares/authMiddleware.js";
import {
    addStore,
    getStoresByOwner,
    getStore,
    getStores,
    getStoresNearby,
    uploadStoreLogo,
    deleteStoreLogo,
    getStoreImages,
    uploadStoreGalleryImage,
    deleteStoreGalleryImage,
    editStore,
    addTeamMember,
    deleteTeamMember,
    editTeamMember,
    getDemoStores,
    toggleStoreStatus,
    resetStoreStatus
} from "../controllers/StoreController.js";
import { uploadSingleFile, uploadTeamMemberImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post('/add', /*protectRoute,*/  addStore);
router.get("/my-stores", protectRoute, getStoresByOwner);
router.get('/nearby', getStoresNearby);
router.get('/', getStores);
router.get("/:storeSlug", getStore);
router.put('/edit/:storeSlug', /*protectRoute,*/ editStore);
router.post('/:storeSlug/team', uploadTeamMemberImage, addTeamMember);
router.delete('/:storeSlug/team/:username', deleteTeamMember);
router.put('/:storeSlug/team/:username', uploadSingleFile('image'), editTeamMember);
router.get('/demo', getDemoStores);

router.put("/:storeSlug/logo", uploadSingleFile("logo"), uploadStoreLogo);
router.delete('/:storeSlug/logo', deleteStoreLogo);

router.get('/:storeSlug/gallery', getStoreImages);
router.put('/:storeSlug/gallery', uploadSingleFile("image"), uploadStoreGalleryImage);
router.delete('/:storeSlug/gallery', deleteStoreGalleryImage);

// Store status routes
router.put('/:storeSlug/status', protectRoute, toggleStoreStatus);
router.delete('/:storeSlug/status', protectRoute, resetStoreStatus);

export default router;