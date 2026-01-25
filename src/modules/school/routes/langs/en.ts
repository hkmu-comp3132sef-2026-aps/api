import { createJsonResponse } from "@jderstd/hono/response";
import {
    ResponseErrorCode,
    ResponseErrorMessage,
} from "@jderstd/hono/response/error";
import { describeRoute, resolver, validator } from "@jderstd/hono-openapi";
import { Hono } from "hono";
import { z } from "zod";

import {
    createJsonFailureResponseSchema,
    createJsonResponseErrorSchema,
    createJsonSuccessResponseSchema,
} from "#/lib/schemas/response";
import { schoolSchemaEn } from "#/modules/school/schemas/langs/en";
import {
    ServiceSchoolReadEnErrorCode,
    ServiceSchoolReadEnErrorMessage,
    serviceSchoolReadEn,
} from "#/modules/school/services/read/en";
import { serviceSchoolReadAllEn } from "#/modules/school/services/read-all/en";

const router: Hono = new Hono();

router.get(
    "/",
    validator(
        "query",
        z.object({
            search: z.string().optional(),
            first: z.coerce.number().optional(),
            after: z.coerce.number().optional(),
            last: z.coerce.number().optional(),
            before: z.coerce.number().optional(),
        }),
    ),
    describeRoute({
        description:
            "The endpoint for retrieving schools information in English",
        operationId: "getSchools",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonSuccessResponseSchema(
                                z.array(schoolSchemaEn),
                            ),
                        ),
                    },
                },
            },
            400: {
                description: "Bad request/Parse error",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.enum([
                                        ResponseErrorCode.BadRequest,
                                        "parse",
                                    ]),
                                    z.string(),
                                ),
                            ),
                        ),
                    },
                },
            },
            413: {
                description: "Request body is too large",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(ResponseErrorCode.TooLarge),
                                    z.literal(ResponseErrorMessage.TooLarge),
                                ),
                            ),
                        ),
                    },
                },
            },
            500: {
                description: "Server error",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(ResponseErrorCode.Server),
                                    z.literal(ResponseErrorMessage.Server),
                                ),
                            ),
                        ),
                    },
                },
            },
            504: {
                description: "Request timeout",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(ResponseErrorCode.Timeout),
                                    z.literal(ResponseErrorMessage.Timeout),
                                ),
                            ),
                        ),
                    },
                },
            },
        },
    }),
    async (c): Promise<Response> => {
        const { search, first, after, last, before } = c.req.valid("query");

        return createJsonResponse({
            data: await serviceSchoolReadAllEn({
                search,
                first,
                after,
                last,
                before,
            }),
        });
    },
);

router.get(
    "/:schoolId",
    validator(
        "param",
        z.object({
            schoolId: z.coerce.number(),
        }),
    ),
    describeRoute({
        description:
            "The endpoint for retrieving school information in English",
        operationId: "getSchool",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonSuccessResponseSchema(schoolSchemaEn),
                        ),
                    },
                },
            },
            400: {
                description: "Bad request/Parse error",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.enum([
                                        ResponseErrorCode.BadRequest,
                                        "parse",
                                    ]),
                                    z.string(),
                                ),
                            ),
                        ),
                    },
                },
            },
            404: {
                description: "School not found",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(
                                        ServiceSchoolReadEnErrorCode.NOT_FOUND,
                                    ),
                                    z.literal(
                                        ServiceSchoolReadEnErrorMessage.NOT_FOUND,
                                    ),
                                ),
                            ),
                        ),
                    },
                },
            },
            413: {
                description: "Request body is too large",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(ResponseErrorCode.TooLarge),
                                    z.literal(ResponseErrorMessage.TooLarge),
                                ),
                            ),
                        ),
                    },
                },
            },
            500: {
                description: "Server error",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(ResponseErrorCode.Server),
                                    z.literal(ResponseErrorMessage.Server),
                                ),
                            ),
                        ),
                    },
                },
            },
            504: {
                description: "Request timeout",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(ResponseErrorCode.Timeout),
                                    z.literal(ResponseErrorMessage.Timeout),
                                ),
                            ),
                        ),
                    },
                },
            },
        },
    }),
    async (c): Promise<Response> => {
        const { schoolId } = c.req.valid("param");

        return createJsonResponse({
            data: await serviceSchoolReadEn({
                schoolId,
            }),
        });
    },
);

export { router as routerSchoolEn };
