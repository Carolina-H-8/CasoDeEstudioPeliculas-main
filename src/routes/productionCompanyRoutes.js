import { Router } from 'express';
import { createProductionCompany, getProductionCompanies } from '../controllers/catalogController.js';

const router = Router();

router.post('/', createProductionCompany);
router.get('/', getProductionCompanies);

export default router;