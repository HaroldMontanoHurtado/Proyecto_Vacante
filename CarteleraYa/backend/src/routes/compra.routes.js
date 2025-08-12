import { Router } from 'express';
import { getCompras, getCompra, createCompra, updateCompra, deleteCompra } from '../controllers/compra.controller.js';

const router = Router();

router.get('/', getCompras);
router.get('/:id', getCompra);
router.post('/', createCompra);
router.put('/:id', updateCompra);
router.delete('/:id', deleteCompra);

export default router;
