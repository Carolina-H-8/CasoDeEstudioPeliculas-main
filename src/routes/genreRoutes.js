import { Router } from 'express';
import { createGenre, getGenres } from '../controllers/genero.js';

const router = Router();

router.post('/', createGenre);
router.get('/', getGenres);

export default router;