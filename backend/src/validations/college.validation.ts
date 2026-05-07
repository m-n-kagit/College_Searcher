import { z } from 'zod';

export const collegeQuerySchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  minFees: z.string().optional().transform(val => val ? Number(val) : undefined),
  maxFees: z.string().optional().transform(val => val ? Number(val) : undefined),
  page: z.string().optional().default('1').transform(Number),
  limit: z.string().optional().default('10').transform(Number),
});

export type CollegeQueryDTO = z.infer<typeof collegeQuerySchema>;