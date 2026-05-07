import { z } from 'zod';
export const predictorSchema = z.object({
    rank: z.number().positive("Rank must be a positive number"),
    examName: z.string().min(1, "Exam name is required"), // e.g., "JEE", "GATE"
    category: z.string().default("General"),
});
//# sourceMappingURL=predictor.validation.js.map