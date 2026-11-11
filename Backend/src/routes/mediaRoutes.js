import { Router } from 'express';
import { createMedia, getMedia, updateMedia, deleteMedia } from '../controllers/mediaController.js';

const router = Router();

router.post('/', createMedia);
router.get('/', getMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

export default router;