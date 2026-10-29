import { Router } from 'express';
import { createType, getTypes } from '../controllers/tipo.js';

const router = Router();

router.post('/', createType);
router.get('/', getTypes);

export default router;