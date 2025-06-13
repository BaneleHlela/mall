import express from 'express';
import {
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  createProduct,
  getAllProducts,
  updateStockAndSoldCount,
  getStoreProducts
} from '../controllers/ProductController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/:id', getProductById);
router.get("/store/:storeId", getStoreProducts);
router.get('/', getAllProducts); 
router.put('/update-stock', updateStockAndSoldCount);
router.get('/slug/:slug', getProductBySlug);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;