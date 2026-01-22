import type { OnErrorHandlerOptions } from "@jderstd/hono/on-error";
import type { Context } from "hono";
import type { HTTPResponseError } from "hono/types";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import { onErrorHandler as jderOnErrorHandler } from "@jderstd/hono/on-error";
import { JderHttpException } from "@jderstd/hono/response/error/http";

import { ServiceError } from "#/lib/errors/service";

/**
 * On error handler.
 */
const onErrorHandler = (options: OnErrorHandlerOptions) => {
    return (err: Error | HTTPResponseError, c: Context): Response => {
        if (err instanceof ServiceError) {
            throw new JderHttpException(
                err.getStatus() as ContentfulStatusCode,
                {
                    res: err.toJsonResponse(),
                },
            );
        }

        return jderOnErrorHandler(options)(err, c);
    };
};

export type { OnErrorHandlerOptions };
export { onErrorHandler };
