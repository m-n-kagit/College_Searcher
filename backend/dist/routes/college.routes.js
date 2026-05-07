import { Router } from 'express';
import * as collegeController from '../controller/college.controller.js';
const router = Router();
// 1. List & Filter
router.get('/', collegeController.getColleges);
// 2. Search (Must be above /:id)
router.get('/search', collegeController.searchColleges);
// 3. Detail
router.get('/:id', collegeController.getCollegeDetails);
// 4. Sub-Resources
router.get('/:id/courses', collegeController.getCollegeCourses);
router.get('/:id/reviews', collegeController.getCollegeReviews);
export default router;
//# sourceMappingURL=college.routes.js.map