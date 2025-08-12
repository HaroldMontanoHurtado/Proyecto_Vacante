import { body } from 'express-validator';

export const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email no es válido')
        .normalizeEmail(),

    body('contrasena')
        .notEmpty().withMessage('La contraseña es obligatoria'),
];
