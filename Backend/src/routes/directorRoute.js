import { Router } from 'express';
import {
    createDirector,
    getDirector,
    updateDirector,
    deleteDirector
} from '../controllers/directorController.js';


const router = Router();
router.post('/', createDirector);
router.get('/', getDirector);
router.put('/:id', updateDirector);
router.delete('/:id', deleteDirector);


export default router;