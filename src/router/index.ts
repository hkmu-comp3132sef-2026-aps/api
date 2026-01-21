import { createJsonResponse } from "@jderstd/hono/response";
import {
    describeRoute,
    openAPIRouteHandler,
    resolver,
} from "@jderstd/hono-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";

import { VERSION } from "#/consts/env";
import { jsonResponseSchema } from "#/lib/schemas/response";
import { routerInfo } from "#/modules/info/routes";
import { routerSchool } from "#/modules/school/routes";

const OPEN_API_JSON_PATH = "/openapi.json" as const;

const router: Hono = new Hono();

router.get(
    "/",
    describeRoute({
        description: "Index page of the API",
        operationId: "getIndex",
        responses: {
            200: {
                description: "Successful response",
                content: {
                    "application/json": {
                        schema: resolver(jsonResponseSchema),
                    },
                },
            },
        },
    }),
    async (): Promise<Response> => {
        return createJsonResponse();
    },
);

router.route("/info", routerInfo);

router.route("/schools", routerSchool);

router.get(
    OPEN_API_JSON_PATH,
    openAPIRouteHandler(router, {
        documentation: {
            info: {
                title: "Hong Kong Schools API",
                version: VERSION,
                description: "Documentation for the Hong Kong Schools API",
            },
        },
    }),
);

router.get(
    "/openapi",
    Scalar({
        pageTitle: "Hong Kong Schools API Documentation",
        theme: "default",
        url: OPEN_API_JSON_PATH,
    }),
);

export { router };
