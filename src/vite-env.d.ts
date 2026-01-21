/** biome-ignore-all lint/correctness/noUnusedVariables: Vite */

/// <reference types="vite/client" />

interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly VITE_VERSION: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
