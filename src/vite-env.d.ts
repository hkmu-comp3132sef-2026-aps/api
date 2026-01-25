/** biome-ignore-all lint/correctness/noUnusedVariables: Vite */

/// <reference types="vite/client" />

interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly VITE_VERSION?: string;
    readonly VITE_DATABASE_URL?: string;
    readonly VITE_DATABASE_TOKEN?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
