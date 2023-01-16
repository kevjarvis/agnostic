import express from 'express';
import CartController from '../controllers/carts.controller';
const router = express.Router();

// Setea las rutas para carrito

router.post('/', CartController.create);
router.delete('/:id', CartController.deleteByID)
router.get('/:id/productos', CartController.getProductsByCart)
router.post('/:id/productos', CartController.addProduct)
router.delete('/:id/productos/:id_prod', CartController.deleteProducts)

export default router
