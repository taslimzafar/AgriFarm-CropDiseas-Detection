/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TFJS_MODEL_URL?: string
  readonly VITE_BACKEND_INFER_URL?: string
  readonly VITE_OPENWEATHER_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
