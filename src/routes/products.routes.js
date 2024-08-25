import {Router} from 'express';
import { createProduct, deleteProductByID, getProductByID, getProducts, updateProductByID } from '../controllers/products.controller.js';
import { isAdmin, isModerator, verifyToken } from '../middlewares/authjwt.js';
const router = Router();

router.get('/', getProducts);
router.post('/', [verifyToken, isModerator, isAdmin], createProduct);
router.get('/:id', getProductByID);
router.put('/:id', [verifyToken, isModerator, isAdmin], updateProductByID);
router.delete('/:id', [verifyToken, isModerator, isAdmin], deleteProductByID);

export default router;