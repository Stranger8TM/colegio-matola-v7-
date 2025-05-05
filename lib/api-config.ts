export const apiConfig = {
  version: "v1",
  prefix: "/api/v1",
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
  jwt: {
    secret: "fallback_secret_do_not_use_in_production",
    expiresIn: "1d",
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por janela por IP
  },
  cors: {
    allowedOrigins: ["http://localhost:3000", "https://colegiomatola.vercel.app"],
    allowedMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
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
      "video/webm",
      "audio/mpeg",
      "audio/wav",
    ],
  },
}
