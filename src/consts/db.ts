import Path from "node:path";

/**
 * The local path to the cache database file.
 */
const DATABASE_LOCAL: string = Path.join(process.cwd(), ".cache.db");

/**
 * The database URL for connecting to the database.
 */
const DATABASE_URL: string =
    import.meta.env?.VITE_DATABASE_URL ?? `file:${DATABASE_LOCAL}`;

/**
 * The database token for authentication.
 */
const DATABASE_TOKEN: string | undefined =
    import.meta.env?.VITE_DATABASE_TOKEN ?? void 0;

export { DATABASE_LOCAL, DATABASE_URL, DATABASE_TOKEN };
