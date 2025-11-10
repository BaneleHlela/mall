import express from 'express';
import {
    createService,
    updateService,
    getStoreServices,
    deleteService,
    getServiceById,
    getServiceBySlug,
 } from '../controllers/ServiceContoller.js';

const router = express.Router();

router.post('/', createService);
router.put('/:id', updateService);
router.get('/store/:storeId', getStoreServices);
router.delete('/:id', deleteService);
router.get('/:id', getServiceById);
router.get('/slug/:slug', getServiceBySlug);

export default router;
