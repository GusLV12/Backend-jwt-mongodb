import {Router} from 'express';
import { createProduct, deleteProductByID, getProductByID, getProducts, updateProductByID } from '../controllers/products.controller.js';
const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProductByID);
router.put('/:id', updateProductByID);
router.delete('/:id', deleteProductByID);

export default router;