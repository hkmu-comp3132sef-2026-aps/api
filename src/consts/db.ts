import Path from "node:path";

/**
 * The database token for authentication.
 */
const DATABASE_TOKEN: string | undefined =
    process.env.DATABASE_TOKEN ??
    import.meta.env?.VITE_DATABASE_TOKEN ??
    void 0;

/**
 * The path to the cache database file.
 */
const DATABASE_PATH: string = Path.join(process.cwd(), ".cache.db");

/**
 * The database URL for connecting to the database.
 */
const DATABASE_URL: string =
    process.env.DATABASE_URL ??
    import.meta.env?.VITE_DATABASE_URL ??
    `file:${DATABASE_PATH}`;

export { DATABASE_TOKEN, DATABASE_URL, DATABASE_PATH };
