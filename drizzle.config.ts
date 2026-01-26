import { defineConfig } from "drizzle-kit";
import { loadEnv } from "vite";

import { DATABASE_LOCAL, DATABASE_TOKEN } from "./src/consts/db";

const env: Record<string, string> = loadEnv(
    process.env.NODE_ENV ?? "development",
    process.cwd(),
);

export default defineConfig({
    dialect: "turso",
    schema: [
        "./src/schema/school.ts",
    ],
    dbCredentials: {
        url: env.VITE_DATABASE_URL ?? DATABASE_LOCAL,
        authToken: env.VITE_DATABASE_TOKEN ?? DATABASE_TOKEN,
    },
});
