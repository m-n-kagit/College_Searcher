import { Router } from 'express';
import * as courseController from '../controller/course.controller';

const courseRouter = Router();

// Base Course Info
courseRouter.get('/:id', courseController.getCourseDetails);

// Course-Specific Sub-data
courseRouter.get('/:id/placements', courseController.getPlacements);
courseRouter.get('/:id/reviews', courseController.getReviews);
courseRouter.get('/:id/cutoffs', courseController.getCutoffs);

export default courseRouter;