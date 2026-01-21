import type { Context, MiddlewareHandler, Next } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import { JderHttpException } from "@jderstd/hono/response/error/http";

import { ServiceError } from "#/lib/errors/service";

/**
 * Middleware to handle service errors.
 */
const serviceErrorHandler: MiddlewareHandler = async (
    _: Context,
    next: Next,
): Promise<void> => {
    try {
        await next();
    } catch (error: unknown) {
        if (error instanceof ServiceError) {
            throw new JderHttpException(
                error.getStatus() as ContentfulStatusCode,
                {
                    res: error.toJsonResponse(),
                },
            );
        }

        throw error;
    }
};

export { serviceErrorHandler };
