import { Router } from 'express';
import { getEntradas, getEntrada, createEntrada, updateEntrada, deleteEntrada } from '../controllers/entrada.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Protege todas las rutas de entradas con autenticación
router.use(authMiddleware.verifyToken);

router.get('/', getEntradas);
router.get('/:id', getEntrada);
router.post('/', createEntrada);
router.put('/:id', updateEntrada);
// Solo admin puede borrar entradas
router.delete('/:id', authMiddleware.verifyRole(['admin']), deleteEntrada);

export default router;
