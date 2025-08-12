import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
    getPeliculas,
    getPelicula,
    createPelicula,
    updatePelicula,
    deletePelicula,
} from "../controllers/pelicula.controller.js";

const router = Router();

// Listar todas las películas (requiere token)
router.get("/", authMiddleware.verifyToken, getPeliculas);

// Obtener una película por id (requiere token)
router.get("/:id", authMiddleware.verifyToken, getPelicula);

// Crear película (solo admin)
router.post(
    "/",
    authMiddleware.verifyToken,
    authMiddleware.verifyRole(["admin"]),
    createPelicula
);

// Actualizar película (solo admin)
router.put(
    "/:id",
    authMiddleware.verifyToken,
    authMiddleware.verifyRole(["admin"]),
    updatePelicula
);

// Eliminar película (solo admin)
router.delete(
    "/:id",
    authMiddleware.verifyToken,
    authMiddleware.verifyRole(["admin"]),
    deletePelicula
);

export default router;
