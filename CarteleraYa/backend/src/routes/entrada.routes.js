import { Router } from 'express';
import { getEntradas, getEntrada, createEntrada, updateEntrada, deleteEntrada } from '../controllers/entrada.controller.js';

const router = Router();

router.get('/', getEntradas);
router.get('/:id', getEntrada);
router.post('/', createEntrada);
router.put('/:id', updateEntrada);
router.delete('/:id', deleteEntrada);

export default router;
