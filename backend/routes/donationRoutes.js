import express from 'express';
import {
  getDonationById,
  getDonationBySlug,
  updateDonation,
  deleteDonation,
  createDonation,
  getAllDonations,
  getStoreDonations,
  updateIsActive
} from '../controllers/DonationController.js';
import { uploadDonationImages } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', uploadDonationImages, createDonation);
router.get('/slug/:slug', getDonationBySlug);
router.get("/store/:storeSlug", getStoreDonations);
router.get('/:id', getDonationById);
router.get('/', getAllDonations);
router.put('/:id',  uploadDonationImages, updateDonation);
router.delete('/:id', deleteDonation);
router.patch('/isActive/:donationId', updateIsActive);

export default router;