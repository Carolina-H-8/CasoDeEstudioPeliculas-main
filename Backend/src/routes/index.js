import { Router } from 'express';
import genreRoutes from './genreRoutes.js';
import directorRoute from './directorRoute.js';
import productionCompanyRoute from './productionCompanyRoutes.js';
import typeRoutes from './typeRoutes.js';
import mediaRoutes from './mediaRoutes.js';



const router = Router();

router.use('/genres', genreRoutes);
router.use('/directors', directorRoute);
router.use('/production-companies', productionCompanyRoute);
router.use('/types', typeRoutes);
router.use('/media', mediaRoutes)


export default router;