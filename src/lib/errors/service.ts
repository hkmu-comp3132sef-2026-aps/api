import type { JsonResponseError } from "@jderstd/hono/response";
import type { StatusCode } from "hono/utils/http-status";

import { createJsonResponse } from "@jderstd/hono/response";

/**
 * ServiceError is a custom error class for service-related errors.
 *
 * It extends the built-in Error class and provides methods to set status, code, path, and message.
 */
class ServiceError extends Error {
    protected status: StatusCode = 500;
    protected code: string = "unknown";
    protected path: string[] = [];

    public setStatus(status: StatusCode): ServiceError {
        this.status = status;
        return this;
    }

    public getStatus(): StatusCode {
        return this.status;
    }

    public setCode(code: string): ServiceError {
        this.code = code;
        return this;
    }

    public getCode(): string {
        return this.code;
    }

    public setPath(path: string[]): ServiceError {
        this.path = path;
        return this;
    }

    public getPath(): string[] {
        return this.path;
    }

    public setMessage(message: string): ServiceError {
        this.message = message;
        return this;
    }

    public getMessage(): string {
        return this.message;
    }

    public toJsonResponseError(): JsonResponseError {
        return {
            code: this.getCode(),
            path: this.getPath(),
            message: this.getMessage(),
        };
    }

    public toJsonResponse(): Response {
        return createJsonResponse({
            status: this.getStatus(),
            errors: [
                this.toJsonResponseError(),
            ],
        });
    }
}

export { ServiceError };
