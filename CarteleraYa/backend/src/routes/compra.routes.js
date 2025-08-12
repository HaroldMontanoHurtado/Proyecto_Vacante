import { Router } from 'express';
import { getCompras, getCompra, createCompra, updateCompra, deleteCompra } from '../controllers/compra.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Protege todas las rutas con autenticación
router.use(authMiddleware.verifyToken);

router.get('/', getCompras);
router.get('/:id', getCompra);
router.post('/', createCompra);
router.put('/:id', updateCompra);
// Solo admin puede borrar compras
router.delete('/:id', authMiddleware.verifyRole(['admin']), deleteCompra);

export default router;
