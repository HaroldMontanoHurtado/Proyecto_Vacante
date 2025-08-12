import { Router } from 'express';
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuario.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validateUsuario, validarCampos } from '../validations/usuario.validation.js';

const router = Router();

// Protege todas las rutas con autenticación
router.use(authMiddleware.verifyToken);

// Solo admin puede listar usuarios o borrarlos
router.get('/', authMiddleware.verifyRole(['admin']), getUsuarios);
router.get('/:id', authMiddleware.verifyRole(['admin']), getUsuario);

// Crear y actualizar usuarios pueden ser acciones abiertas o también restringidas
// Agregamos validaciones para creación y actualización
router.post('/', authMiddleware.verifyRole(['admin']), validateUsuario, validarCampos, createUsuario);
router.put('/:id', authMiddleware.verifyRole(['admin']), validateUsuario, validarCampos, updateUsuario);

router.delete('/:id', authMiddleware.verifyRole(['admin']), deleteUsuario);

export default router;
