import { Router } from 'express';
import { createDirector, getDirectors } from '../controllers/catalogController.js';

const router = Router();

router.post('/', createDirector);
router.get('/', getDirectors);

export default router;