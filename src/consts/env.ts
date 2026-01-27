/**
 * Indicates if the environment is development.
 */
const IS_DEV: boolean = import.meta.env.DEV;

/**
 * Indicates if the environment is production.
 */
const IS_PRD: boolean = import.meta.env.PROD;

/**
 * The version of the application.
 */
const VERSION: string = import.meta.env.VITE_VERSION ?? "0.0.0";

/**
 * The MongoDB connection URI.
 */
const MONGODB_URI: string =
    import.meta.env.VITE_MONGODB_URI ?? "mongodb://localhost:27017";

/**
 * The MongoDB database name.
 */
const MONGODB_DB_NAME: string = import.meta.env.VITE_MONGODB_DB_NAME ?? "sch";

export { IS_DEV, IS_PRD, VERSION, MONGODB_URI, MONGODB_DB_NAME };
