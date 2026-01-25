import type { Client } from "@libsql/client";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { DATABASE_TOKEN, DATABASE_URL } from "#/consts/db";

const client: Client = createClient({
    url: DATABASE_URL,
    authToken: DATABASE_TOKEN,
});

const db = drizzle({
    client,
});

type DB = typeof db;

export type { DB };
export { db };
