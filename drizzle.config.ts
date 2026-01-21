import { defineConfig } from "drizzle-kit";

import { PATH_CACHE_DB } from "./src/consts/path";

export default defineConfig({
    dialect: "sqlite",
    schema: [
        "./src/schema/school.ts",
    ],
    dbCredentials: {
        url: PATH_CACHE_DB,
    },
});
