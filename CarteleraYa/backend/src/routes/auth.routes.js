import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validateUsuario, validarCampos } from '../validations/usuario.validation.js';
import { validateLogin } from '../validations/auth.validation.js'; // nuevo archivo para login

const router = Router();

router.post("/register", validateUsuario, validarCampos, register);
router.post("/login", validateLogin, validarCampos, login);

export default router;
