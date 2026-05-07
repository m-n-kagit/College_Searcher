import { Router } from 'express';
import * as savedController from '../controller/saved.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const router = Router();
// All routes here require being logged in
router.use(protect);
router.get('/', savedController.getMySavedItems);
router.post('/:collegeId', savedController.addToSaved);
router.delete('/:collegeId/remove', savedController.removeFromSaved);
export default router;
//# sourceMappingURL=saved.routes.js.map