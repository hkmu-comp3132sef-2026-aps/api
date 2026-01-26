import { defineConfig } from "drizzle-kit";
import { loadEnv } from "vite";

import { DATABASE_LOCAL, WDB_TOKEN } from "./src/consts/db";

type MetaEnv = {
    readonly VITE_VERSION?: string;
    readonly VITE_RDB_URL?: string;
    readonly VITE_RDB_TOKEN?: string;
    readonly VITE_WDB_URL?: string;
    readonly VITE_WDB_TOKEN?: string;
};

const env: MetaEnv = loadEnv(
    process.env.NODE_ENV ?? "development",
    process.cwd(),
);

export default defineConfig({
    dialect: "turso",
    schema: [
        "./src/schema/school.ts",
    ],
    dbCredentials: {
        url: env.VITE_WDB_URL ?? DATABASE_LOCAL,
        authToken: env.VITE_WDB_TOKEN ?? WDB_TOKEN,
    },
});
