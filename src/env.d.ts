/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BENZINGA_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
