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
    resetStoreStatus,
    initializeStoreWebsites,
    createExternalWebsiteLayout,
    updateExternalWebsiteLayout,
    uploadStoreThumbnail,
    deleteStoreThumbnail,
    captureStoreCardAuto,
    captureReelyAuto,
    cloneStore
} from "../controllers/StoreController.js";
import { uploadSingleFile, uploadTeamMemberImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Store routes
router.post('/add', protectRoute,  addStore);
router.get("/my-stores", protectRoute, getStoresByOwner);
router.get('/nearby', getStoresNearby);
router.get('/', getStores);
router.get("/:storeSlug", getStore);
router.put('/edit/:storeSlug', /*protectRoute,*/ editStore);

// Team Member Routes
router.post('/:storeSlug/team', uploadTeamMemberImage, addTeamMember);
router.delete('/:storeSlug/team/:username', deleteTeamMember);
router.put('/:storeSlug/team/:username', uploadSingleFile('image'), editTeamMember);

router.get('/demo', getDemoStores);

router.put("/:storeSlug/logo", uploadSingleFile("logo"), uploadStoreLogo);
router.delete('/:storeSlug/logo', deleteStoreLogo);

router.get('/:storeSlug/gallery', getStoreImages);
router.put('/:storeSlug/gallery', uploadSingleFile("image"), uploadStoreGalleryImage);
router.delete('/:storeSlug/gallery', deleteStoreGalleryImage);

// Thumbnail routes
router.put('/:storeSlug/thumbnails', uploadSingleFile("thumbnail"), uploadStoreThumbnail);
router.delete('/:storeSlug/thumbnails', deleteStoreThumbnail);
router.post('/:storeSlug/thumbnails/storeCard/capture', captureStoreCardAuto);
router.post('/:storeSlug/thumbnails/reely/capture', captureReelyAuto);

// Store status routes
router.put('/:storeSlug/status', protectRoute, toggleStoreStatus);
router.delete('/:storeSlug/status', protectRoute, resetStoreStatus);

// External website layout routes
router.post('/:storeSlug/external-website', /*protectRoute,*/ createExternalWebsiteLayout);
router.put('/:storeSlug/external-website', /*protectRoute,*/ updateExternalWebsiteLayout);

// Initialize website objects for existing stores
router.post('/initialize-websites', initializeStoreWebsites);

// Clone store for multi-location
router.post('/:storeId/clone', protectRoute, cloneStore);



export default router;