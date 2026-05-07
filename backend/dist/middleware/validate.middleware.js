import { ZodError } from "zod";
/**
 * validate(schema)
 * Middleware to validate request body using a Zod schema
 */
export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next(); // validation passed
        }
        catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Failed",
                    errors: err.issues.map((issue) => ({
                        field: issue.path.join("."), // path to the invalid field
                        message: issue.message,
                    })),
                });
            }
            // Fallback for unexpected errors
            return res.status(500).json({
                success: false,
                message: "Internal Server Error during validation",
            });
        }
    };
};
//# sourceMappingURL=validate.middleware.js.map