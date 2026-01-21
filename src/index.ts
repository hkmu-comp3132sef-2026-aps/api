import { serveStatic } from "@hono/node-server/serve-static";
import { notFoundHandler } from "@jderstd/hono/not-found";
import { onErrorHandler } from "@jderstd/hono/on-error";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { PATH_PUBLIC } from "#/consts/path";
import { serviceErrorHandler } from "#/middlewares/error";
import { router } from "#/router";

const app: Hono = new Hono();

app.use(
    cors({
        origin(origin: string): string {
            return origin;
        },
        credentials: true,
    }),
);

app.use(serviceErrorHandler);

app.route("/", router);

app.use(
    "/*",
    serveStatic({
        root: PATH_PUBLIC,
    }),
);

app.notFound(notFoundHandler());

app.onError(
    onErrorHandler({
        verbose: true,
    }),
);

export default app;
