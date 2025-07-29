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
    addTeamMember,
    deleteTeamMember,
    editTeamMember,
    getDemoStores
} from "../controllers/StoreController.js";
import { uploadSingleFile, uploadTeamMemberImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post('/add', /*protectRoute,*/  addStore);
router.get("/my-stores", protectRoute, getStoresByOwner);
router.get("/:storeId", getStore);
router.get('/', getStores);
router.put('/edit/:storeId', /*protectRoute,*/ editStore);
router.post('/:storeId/team', uploadTeamMemberImage, addTeamMember);
router.delete('/:storeId/team/:username', deleteTeamMember);
router.put('/:storeId/team/:username', uploadSingleFile('image'), editTeamMember);
router.get('/demo', getDemoStores);

router.put("/:storeId/logo", uploadSingleFile("logo"), uploadStoreLogo);
router.delete('/:storeId/logo', deleteStoreLogo);

router.get('/:storeId/gallery', getStoreImages); 
router.put('/:storeId/gallery', uploadSingleFile("image"), uploadStoreGalleryImage);
router.delete('/:storeId/gallery', deleteStoreGalleryImage);



export default router;