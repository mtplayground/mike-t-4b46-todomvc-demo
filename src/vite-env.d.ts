/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TODO_STORAGE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
