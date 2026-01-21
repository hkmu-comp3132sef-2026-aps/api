import { createJsonResponse } from "@jderstd/hono/response";
import { describeRoute, resolver, validator } from "@jderstd/hono-openapi";
import { Hono } from "hono";
import { z } from "zod";

import { createJsonSuccessResponseSchema } from "#/lib/schemas/response";
import { schoolSchemaZhHant } from "#/modules/school/schemas/langs/zh-hant";
import { serviceSchoolReadZhHant } from "#/modules/school/services/read/zh-hant";
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
