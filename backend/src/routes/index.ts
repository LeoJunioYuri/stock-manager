import express from 'express';
import { login, register } from '../controllers/authController';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController';
import authenticateToken from '../middleware/auth';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/products', authenticateToken, createProduct);
router.get('/products', authenticateToken, getProducts);
router.put('/products/:id', authenticateToken, updateProduct);
router.delete('/products/:id', authenticateToken, deleteProduct);

export default router;
