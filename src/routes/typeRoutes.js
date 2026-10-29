import { Router } from 'express';
import { createType, getTypes, updateType, deleteType } from '../controllers/tipo.js';

const router = Router();

router.post('/', createType);
router.get('/', getTypes);
router.put('/:id', updateType);     
router.patch('/:id', updateType);  
router.delete('/:id', deleteType);

export default router;
