import { Router } from 'express';
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuario.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Protege todas las rutas con autenticación
router.use(authMiddleware.verifyToken);

// Solo admin puede listar usuarios o borrarlos
router.get('/', authMiddleware.verifyRole(['admin']), getUsuarios);
router.get('/:id', authMiddleware.verifyRole(['admin']), getUsuario);

// Crear y actualizar usuarios pueden ser acciones abiertas o también restringidas, aquí ejemplo restringido a admin:
router.post('/', authMiddleware.verifyRole(['admin']), createUsuario);
router.put('/:id', authMiddleware.verifyRole(['admin']), updateUsuario);
router.delete('/:id', authMiddleware.verifyRole(['admin']), deleteUsuario);

export default router;
