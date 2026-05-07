import { Router } from 'express';
import { handleComparison } from '../controller/compare.controller';

const router = Router();

// GET /api/v1/compare?ids=clg1_id,clg2_id
router.get('/', handleComparison);

export default router;