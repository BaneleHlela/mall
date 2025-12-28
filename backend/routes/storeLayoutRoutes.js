import express from "express";
import {
    createLayoutConfig,
    getLayoutConfig,
    updateLayoutConfig,
    deleteLayoutConfig,
    getLayoutByDemoStore,
    getDemoLayouts,
    replaceLayoutColor,
    createLayoutConfigWithSettings,
    updateLayoutConfigWithSettings,
    getStoreLayouts,
    captureLayoutScreenshot,
    getLayoutByName
} from "../controllers/StoreLayoutController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Specific routes
router.post("/", /*protectRoute,*/ createLayoutConfig);
router.get('/demo', getDemoLayouts);
router.post('/with-settings', createLayoutConfigWithSettings);
router.put('/update-with-settings', updateLayoutConfigWithSettings);
router.get('/store/:storeId', getStoreLayouts)
router.get('/name/:name', getLayoutByName)

// Dynamic routes
router.put('/:layoutId', /*protectRoute,*/ /*isAdmin,*/ updateLayoutConfig);
router.get('/:layoutId', /*protectRoute,*/ getLayoutConfig);
router.delete('/:layoutId', /*protectRoute,*/ deleteLayoutConfig);
router.put('/capture/:layoutId', captureLayoutScreenshot);

router.get('/demo-store/:storeId', getLayoutByDemoStore);
router.put('/replace-color/:layoutId', replaceLayoutColor);



export default router;