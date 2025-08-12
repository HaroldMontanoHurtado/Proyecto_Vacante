import { body, validationResult } from 'express-validator';

// Validaciones para creación y actualización de usuario
export const validateUsuario = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

    body('apellido')
        .trim()
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

    body('email')
        .trim()
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email no es válido'),

    body('telefono')
        .trim()
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isMobilePhone('es-CO').withMessage('El teléfono no es válido para Colombia'),

    body('contrasena')
        .optional() // Puede ser opcional en update
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

// Middleware para validar y responder errores
export const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
