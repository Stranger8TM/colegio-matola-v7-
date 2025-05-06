// Configurações da API

// Versão da API
export const API_VERSION = "v1"

// Prefixo da API
export const API_PREFIX = `/api/${API_VERSION}`

// Configurações de paginação
export const PAGINATION_DEFAULT_PAGE = 1
export const PAGINATION_DEFAULT_LIMIT = 10
export const PAGINATION_MAX_LIMIT = 100

// Configurações de JWT
export const JWT_EXPIRATION = "1d" // 1 dia
export const JWT_REFRESH_EXPIRATION = "7d" // 7 dias

// Configurações de rate limiting
export const RATE_LIMIT_MAX = 100 // Máximo de requisições
export const RATE_LIMIT_WINDOW_MS = 60 * 1000 // Janela de 1 minuto

// Configurações de cache
export const CACHE_MAX_AGE = 60 // 60 segundos

// Configurações de CORS
export const CORS_ALLOWED_ORIGINS = [
  "https://escolaprivada.co.mz",
  "https://admin.escolaprivada.co.mz",
  "http://localhost:3000",
]

// Configurações de upload
export const UPLOAD_MAX_SIZE = 10 * 1024 * 1024 // 10 MB
export const UPLOAD_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "video/mp4",
  "video/mpeg",
  "video/quicktime",
  "audio/mpeg",
  "audio/wav",
]
