import { serveStatic } from "@hono/node-server/serve-static";
import { bodyLimit } from "@jderstd/hono/body-limit";
import { notFoundHandler } from "@jderstd/hono/not-found";
import { timeLimit } from "@jderstd/hono/time-limit";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { PATH_PUBLIC } from "#/consts/path";
import { onErrorHandler } from "#/middlewares/on-error";
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

app.use(
    bodyLimit({
        max: 10 * 1024 * 1024,
    }),
);

app.use(
    timeLimit({
        max: 10 * 1000,
    }),
);

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
