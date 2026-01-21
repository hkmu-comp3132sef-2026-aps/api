import { z } from "zod";

/**
 * Default dataless JSON response schema.
 */
const jsonResponseSchema = z.object({
    success: z.boolean(),
    data: z.null(),
    errors: z.array(z.never()),
});

/**
 * Function to create a JSON success response schema with specified data type.
 */
const createJsonSuccessResponseSchema = (data: z.ZodType) => {
    return z.object({
        success: z.literal(true),
        data,
        errors: z.array(z.never()),
    });
};

/**
 * Function to create a JSON error response schema with specified code and message types.
 */
const createJsonResponseErrorSchema = (code: z.ZodType, message: z.ZodType) => {
    return z.object({
        code,
        path: z.array(z.string()),
        message,
    });
};

/**
 * Function to create a JSON failure response schema with specified error type.
 */
const createJsonFailureResponseSchema = (error: z.ZodType) => {
    return z.object({
        success: z.literal(false),
        data: z.null(),
        errors: z.array(error),
    });
};

export {
    jsonResponseSchema,
    createJsonSuccessResponseSchema,
    createJsonResponseErrorSchema,
    createJsonFailureResponseSchema,
};
