import { Router } from 'express';
import { createDirector, getDirectors } from '../controllers/director.js';
import { updateDirector } from '../service/catalogService.js';

const router = Router();

router.post('/', createDirector);
router.get('/', getDirectors);
router.put('/:id',updateDirector);


export default router;