import * as Path from "node:path";

/**
 * The path to the public directory.
 */
const PATH_PUBLIC: string = Path.join(process.cwd(), "public");

/**
 * The path to the cache database file.
 */
const PATH_CACHE_DB: string = Path.join(process.cwd(), ".cache.db");

export { PATH_PUBLIC, PATH_CACHE_DB };
