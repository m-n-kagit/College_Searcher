import { z } from 'zod';
export const createReviewSchema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().min(10, "Comment must be at least 10 characters"),
    collegeId: z.string().optional(),
    courseId: z.string().optional(),
}).refine(data => data.collegeId || data.courseId, {
    message: "Review must be linked to either a college or a course",
});
//# sourceMappingURL=review.validation.js.map