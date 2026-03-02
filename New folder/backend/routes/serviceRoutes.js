import express from 'express';
import {
    createService,
    updateService,
    getStoreServices,
    deleteService,
    getServiceById,
    getServiceBySlug,
  } from '../controllers/ServiceContoller.js';
import { uploadServiceImages } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', uploadServiceImages, createService);
router.put('/:id', uploadServiceImages, updateService);
router.get('/store/:storeId', getStoreServices);
router.delete('/:id', deleteService);
router.get('/:id', getServiceById);
router.get('/slug/:slug', getServiceBySlug);

export default router;
