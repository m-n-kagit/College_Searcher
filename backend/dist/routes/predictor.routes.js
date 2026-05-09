import { Router } from 'express';
import * as predictorController from '../controller/predictor.controller';
import { validate } from '../middleware/validate.middleware';
import { predictorSchema } from '../validations/predictor.validation';
const router = Router();
// General view of all cutoffs
router.get('/cutoffs', predictorController.getCutoffs);
// The actual predictor tool
router.post('/predictor', validate(predictorSchema), predictorController.getPredictions);
export default router;
//# sourceMappingURL=predictor.routes.js.map