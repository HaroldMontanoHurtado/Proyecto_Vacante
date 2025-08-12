import { Router } from 'express';
import {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
} from '../controllers/usuario.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validateUsuario, validarCampos } from '../validations/usuario.validation.js';

const router = Router();

// Todas las rutas protegidas con token
router.use(authMiddleware.verifyToken);

// Listar usuarios - solo admin
router.get('/', authMiddleware.verifyRole(['admin']), getUsuarios);

// Obtener usuario por id - admin o usuario mismo
router.get('/:id', (req, res, next) => {
    if (req.user.rol === 'admin' || req.user.id == req.params.id) return next();
    return res.status(403).json({ message: 'No tienes permisos para esta acción' });
}, getUsuario);

// Crear usuario - solo admin con validación
router.post('/', authMiddleware.verifyRole(['admin']), validateUsuario, validarCampos, createUsuario);

// Actualizar usuario - solo admin con validación
router.put('/:id', authMiddleware.verifyRole(['admin']), validateUsuario, validarCampos, updateUsuario);

// Eliminar usuario - solo admin
router.delete('/:id', authMiddleware.verifyRole(['admin']), deleteUsuario);

export default router;
