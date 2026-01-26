/** biome-ignore-all lint/correctness/noUnusedVariables: Vite */

/// <reference types="vite/client" />

interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly VITE_VERSION?: string;
    readonly VITE_RDB_URL?: string;
    readonly VITE_RDB_TOKEN?: string;
    readonly VITE_WDB_URL?: string;
    readonly VITE_WDB_TOKEN?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
