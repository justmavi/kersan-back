export default () => ({
  global: {
    httpPort: process.env.HTTP_PORT ?? 3000,
    nodeEnv: process.env.NODE_ENV ?? 'development',
    uploadsFolder: process.env.UPLOADS_FOLDER ?? './images',
    maxUploadsPerRequest: process.env.MAX_UPLOADS_PER_REQUEST ?? 8,
  },
});
