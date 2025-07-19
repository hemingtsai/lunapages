/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBSITE_TITLE: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
