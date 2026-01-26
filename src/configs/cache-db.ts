import type { Client } from "@libsql/client";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { RDB_TOKEN, RDB_URL, WDB_TOKEN, WDB_URL } from "#/consts/db";

const readClient: Client = createClient({
    url: RDB_URL,
    authToken: RDB_TOKEN,
});

const readDB = drizzle({
    client: readClient,
});

const writeClient: Client = createClient({
    url: WDB_URL,
    authToken: WDB_TOKEN,
});

const writeDB = drizzle({
    client: writeClient,
});

type DB = typeof readDB;

export type { DB };
export { readDB, writeDB };
