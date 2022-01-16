export default () => ({
  global: {
    httpPort: process.env.HTTP_PORT ?? 8080,
    nodeEnv: process.env.NODE_ENV ?? 'development',
    uploadsFolder: process.env.UPLOADS_FOLDER ?? './images',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? 'secretKey',
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME ?? '24h',
  },
  hash: {
    rounds: process.env.BCRYPT_PASS_HASH_ROUNDS ?? 10,
  },
});
