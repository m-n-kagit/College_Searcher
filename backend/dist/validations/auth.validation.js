import { z } from 'zod';
// Define the schema for Signup
export const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});
// Define the schema for Login
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
});
//# sourceMappingURL=auth.validation.js.map