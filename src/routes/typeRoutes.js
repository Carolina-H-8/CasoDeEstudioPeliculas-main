import { Router } from 'express';
import { createType, getTypes } from '../controllers/catalogController.js';

const router = Router();

router.post('/', createType);
router.get('/', getTypes);

export default router;