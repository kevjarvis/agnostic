import express from 'express';
const router = express.Router();
import ProductController from '../controllers/products.controller';

// Setea las rutas para productos

router.get('/', ProductController.listAll);
router.get('/:id', ProductController.listByID)
router.post('/', ProductController.add)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

export default router

