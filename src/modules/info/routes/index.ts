import type { Info } from "#/modules/info/schemas";

import { createJsonResponse } from "@jderstd/hono/response";
import { describeRoute, resolver } from "@jderstd/hono-openapi";
import { Hono } from "hono";

import { createJsonSuccessResponseSchema } from "#/lib/schemas/response";
import { infoSchema } from "#/modules/info/schemas";
import { serviceInfo } from "#/modules/info/services";

const router: Hono = new Hono();

router.get(
    "/",
    describeRoute({
        description: "The endpoint for retrieving API information",
        operationId: "getInfo",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(
                            createJsonSuccessResponseSchema(infoSchema),
                        ),
                    },
                },
            },
        },
    }),
    async (): Promise<Response> => {
        const info: Info = await serviceInfo();

        return createJsonResponse<Info>({
            data: info,
        });
    },
);

export { router as routerInfo };
