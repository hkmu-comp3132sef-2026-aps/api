import { createJsonResponse } from "@jderstd/hono/response";
import { describeRoute, resolver, validator } from "@jderstd/hono-openapi";
import { Hono } from "hono";
import { z } from "zod";

import { ServiceErrorCode } from "#/lib/errors/code";
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
                                        ServiceErrorCode.BAD_REQUEST,
                                        "parse",
                                    ]),
                                    z.string(),
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
                                    z.literal(ServiceErrorCode.SERVER),
                                    z.string(),
                                ),
                            ),
                        ),
                    },
                },
            },
        },
    }),
    async (): Promise<Response> => {
        return createJsonResponse({
            data: await serviceSchoolReadAllEn(),
        });
    },
);

router.get(
    "/:id",
    validator(
        "param",
        z.object({
            id: z.string(),
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
                                        ServiceErrorCode.BAD_REQUEST,
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
            500: {
                description: "Server error",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonFailureResponseSchema(
                                createJsonResponseErrorSchema(
                                    z.literal(ServiceErrorCode.SERVER),
                                    z.string(),
                                ),
                            ),
                        ),
                    },
                },
            },
        },
    }),
    async (c): Promise<Response> => {
        const { id } = c.req.valid("param");

        return createJsonResponse({
            data: await serviceSchoolReadEn({
                id,
            }),
        });
    },
);

export { router as routerSchoolEn };
