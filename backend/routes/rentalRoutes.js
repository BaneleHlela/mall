import express from 'express';
import {
    createRental,
    updateRental,
    getStoreRentals,
    deleteRental,
    getRentalById,
    getRentalBySlug,
    updateIsActive,
  } from '../controllers/RentalController.js';
import { uploadRentalImages } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', uploadRentalImages, createRental);
router.put('/:id', uploadRentalImages, updateRental);
router.get('/store/:storeId', getStoreRentals);
router.delete('/:id', deleteRental);
router.get('/:id', getRentalById);
router.get('/slug/:slug', getRentalBySlug);
router.patch('/isActive/:rentalId', updateIsActive);

export default router;