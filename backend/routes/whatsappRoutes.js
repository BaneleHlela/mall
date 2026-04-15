import express from 'express';
import { sendWhatsAppMessage } from '../controllers/WhatsAppController.js';

const router = express.Router();
router.post('/send', sendWhatsAppMessage);

export default router;