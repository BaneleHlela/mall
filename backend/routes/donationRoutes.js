import express from 'express';
import { 
    createDonation, 
    getAllDonations,
    getDonationById,
    getDonationsByDonor,
    getDonationsByRecipient,
    updateDonationStatus,
    deleteDonation,
    filterDonations,
} from '../controllers/DonationController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protectRoute, createDonation);
router.get("/", filterDonations); 
router.get("/:id", getDonationById);
router.get("/donor/:donorId", getDonationsByDonor);
router.get("/recipient/:recipientId", getDonationsByRecipient); 
router.get("/filter", filterDonations); 
router.delete("/:id", deleteDonation);
router.put("/:id/status", updateDonationStatus);

export default router;