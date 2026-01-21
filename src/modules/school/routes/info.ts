import type { SchoolInfo } from "#/modules/school/schemas/info";

import { createJsonResponse } from "@jderstd/hono/response";
import { describeRoute, resolver } from "@jderstd/hono-openapi";
import { Hono } from "hono";

import { createJsonSuccessResponseSchema } from "#/lib/schemas/response";
import { schoolInfoSchema } from "#/modules/school/schemas/info";
import { serviceSchoolInfo } from "#/modules/school/services/info";

const router: Hono = new Hono();

router.get(
    "/info",
    describeRoute({
        description: "The endpoint for retrieving school fetching information",
        operationId: "getSchoolInfo",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonSuccessResponseSchema(schoolInfoSchema),
                        ),
                    },
                },
            },
        },
    }),
    async (): Promise<Response> => {
        const info: SchoolInfo = await serviceSchoolInfo();

        return createJsonResponse<SchoolInfo>({
            data: info,
        });
    },
);

export { router as routerSchoolInfo };
