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

export { IS_DEV, IS_PRD, VERSION };
