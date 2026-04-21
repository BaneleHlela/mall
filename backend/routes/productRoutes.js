import express from 'express';
import {
  getProductBySlug,
  updateProduct,
  deleteProduct,
  createProduct,
  getAllProducts,
  updateStockAndSoldCount,
  getStoreProducts,
  updateIsActive,
  updateProductStats,
  getSearchPostProducts
} from '../controllers/ProductController.js';
import { uploadProductImages } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', uploadProductImages, createProduct);
router.get("/store/:storeId", getStoreProducts);
router.get('/', getAllProducts); 
router.put('/update-stock', updateStockAndSoldCount);
router.get('/slug/:slug', getProductBySlug);
router.put('/:id',  uploadProductImages, updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/isActive/:productId', updateIsActive);
router.patch('/stats/:productId', updateProductStats);
router.get('/search-posts/:type', getSearchPostProducts);

export default router;