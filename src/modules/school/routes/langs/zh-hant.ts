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
import { schoolSchemaZhHant } from "#/modules/school/schemas/langs/zh-hant";
import {
    ServiceSchoolReadZhHantErrorCode,
    ServiceSchoolReadZhHantErrorMessage,
    serviceSchoolReadZhHant,
} from "#/modules/school/services/read/zh-hant";
import { serviceSchoolReadAllZhHant } from "#/modules/school/services/read-all/zh-hant";

const router: Hono = new Hono();

router.get(
    "/",
    describeRoute({
        description:
            "The endpoint for retrieving schools information in Traditional Chinese",
        operationId: "getSchools",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonSuccessResponseSchema(
                                z.array(schoolSchemaZhHant),
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
            data: await serviceSchoolReadAllZhHant(),
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
            "The endpoint for retrieving school information in Traditional Chinese",
        operationId: "getSchool",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonSuccessResponseSchema(schoolSchemaZhHant),
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
                                        ServiceSchoolReadZhHantErrorCode.NOT_FOUND,
                                    ),
                                    z.literal(
                                        ServiceSchoolReadZhHantErrorMessage.NOT_FOUND,
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
            data: await serviceSchoolReadZhHant({
                id,
            }),
        });
    },
);

export { router as routerSchoolZhHant };
