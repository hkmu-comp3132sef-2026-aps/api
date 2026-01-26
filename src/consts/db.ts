import Path from "node:path";

/**
 * The local path to the cache database file.
 */
const DATABASE_LOCAL: string = Path.join(process.cwd(), ".cache.db");

/**
 * The database URL for connecting to the database in read-only mode.
 */
const RDB_URL: string =
    import.meta.env?.VITE_RDB_URL ?? `file:${DATABASE_LOCAL}`;

/**
 * The read-only database token for authentication.
 */
const RDB_TOKEN: string | undefined = import.meta.env?.VITE_RDB_TOKEN ?? void 0;

/**
 * The database URL for connecting to the database in read-write mode.
 */
const WDB_URL: string =
    import.meta.env?.VITE_WDB_URL ?? `file:${DATABASE_LOCAL}`;

/**
 * The read-write database token for authentication.
 */
const WDB_TOKEN: string | undefined = import.meta.env?.VITE_WDB_TOKEN ?? void 0;

export { DATABASE_LOCAL, RDB_URL, RDB_TOKEN, WDB_URL, WDB_TOKEN };
