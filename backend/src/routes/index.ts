import express from 'express';
import { login, register } from '../controllers/authController';
import { createProduct, getProducts } from '../controllers/productController';
import authenticateToken from '../middleware/auth';

const router = express.Router();

router.post('/login', login); // sem /api
router.post('/register', register); // sem /api
router.post('/products', authenticateToken, createProduct);
router.get('/products', authenticateToken, getProducts);

export default router;
