/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_BASE_API: string;
  readonly VITE_BASE_AUTH: string;
  readonly VITE_BASE_MOCK: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
