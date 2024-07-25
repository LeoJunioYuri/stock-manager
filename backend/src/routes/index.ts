import express from 'express';
import { login } from '../controllers/authController';
import { createProduct, getProducts } from '../controllers/productController';
import authenticateToken from '../middleware/auth';

const router = express.Router();

router.post('/api/login', login);
router.post('/api/products', authenticateToken, createProduct);
router.get('/api/products', authenticateToken, getProducts);

export default router;
