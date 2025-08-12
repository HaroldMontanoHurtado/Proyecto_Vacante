import { body, validationResult } from 'express-validator';

// Validaciones para creación y actualización de usuario
export const validateUsuario = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .escape(),

    body('apellido')
        .trim()
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres')
        .escape(),

    body('email')
        .trim()
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email no es válido')
        .normalizeEmail(),

    body('telefono')
        .trim()
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isMobilePhone('es-CO').withMessage('El teléfono no es válido para Colombia'),

    body('contrasena')
        .if(body('contrasena').exists())
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    body('rol')
        .optional()
        .isIn(['admin', 'cliente']).withMessage('Rol inválido'),
];

// Middleware para validar y responder errores
export const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    console.log('Validación de campos:', errors.array()); // <--- prueba para saber si se validan los campos
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
