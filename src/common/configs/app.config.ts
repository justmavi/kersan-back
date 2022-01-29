export default () => ({
  global: {
    httpPort: process.env.HTTP_PORT ?? 8080,
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
  upload: {
    path: process.env.UPLOADS_FOLDER ?? './images',
    allowedExtensions: process.env.ALLOWED_EXTENSIONS_TO_UPLOAD?.split(',') ?? [
      'jpg',
      'jpeg',
      'png',
    ],
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? 'secretKey',
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME ?? '24h',
  },
});
