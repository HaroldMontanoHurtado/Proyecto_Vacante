import { Router } from 'express';
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuario.controller.js';

import pool from "../db.js";

const router = Router();

// Codigo para enseñar las peliculas en http://localhost:3000/api/usuario
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuario");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;
