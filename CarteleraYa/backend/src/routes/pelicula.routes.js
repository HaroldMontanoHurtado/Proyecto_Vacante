import { Router } from "express";
import { getPeliculas, getPelicula, createPelicula, updatePelicula, deletePelicula } from '../controllers/pelicula.controller.js';

const router = Router();

router.get('/', getPeliculas);
router.get('/:id', getPelicula);
router.post('/', createPelicula);
router.put('/:id', updatePelicula);
router.delete('/:id', deletePelicula);

export default router;
