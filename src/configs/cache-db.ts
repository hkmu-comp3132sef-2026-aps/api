import type { Client } from "@libsql/client";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { PATH_CACHE_DB } from "#/consts/path";

const client: Client = createClient({
    url: `file:${PATH_CACHE_DB}`,
});

const cacheDB = drizzle({
    client,
});

type CacheDB = typeof cacheDB;

export type { CacheDB };
export { cacheDB };
