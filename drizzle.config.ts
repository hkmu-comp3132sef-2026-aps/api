import { defineConfig } from "drizzle-kit";

import { DATABASE_PATH, DATABASE_TOKEN } from "./src/consts/db";

export default defineConfig({
    dialect: "turso",
    schema: [
        "./src/schema/school.ts",
    ],
    dbCredentials: {
        url:
            process.env.DATABASE_URL ??
            (import.meta as any)?.env?.VITE_DATABASE_URL ??
            DATABASE_PATH,
        authToken: DATABASE_TOKEN,
    },
});
