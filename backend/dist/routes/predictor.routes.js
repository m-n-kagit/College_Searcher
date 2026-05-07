import { Router } from 'express';
import * as predictorController from '../controller/predictor.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { predictorSchema } from '../validations/predictor.validation.js';
const router = Router();
// General view of all cutoffs
router.get('/cutoffs', predictorController.getCutoffs);
// The actual predictor tool
router.post('/predictor', validate(predictorSchema), predictorController.getPredictions);
export default router;
//# sourceMappingURL=predictor.routes.js.map