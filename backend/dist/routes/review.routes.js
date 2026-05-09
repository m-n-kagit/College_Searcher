import { Router } from 'express';
import * as reviewController from '../controller/review.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createReviewSchema } from '../validations/review.validation';
const reviewRouter = Router();
// Create a review (Protected)
reviewRouter.post('/', protect, validate(createReviewSchema), reviewController.postReview);
// Get specific review (Public)
reviewRouter.get('/:id', reviewController.getReview);
// Delete review (Protected + Ownership check)
reviewRouter.delete('/:id/delete', protect, reviewController.removeReview);
export default reviewRouter;
//# sourceMappingURL=review.routes.js.map