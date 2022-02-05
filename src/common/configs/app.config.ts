export default () => ({
  global: {
    httpPort: process.env.HTTP_PORT ?? 8080,
    nodeEnv: process.env.NODE_ENV ?? 'development',
    host: process.env.APP_HOST ?? 'http://localhost:8080',
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
  log: {
    directoryPath: process.env.LOG_DIRECTORY_PATH ?? './logs',
    fileName: process.env.LOG_FILE_NAME ?? 'kersan-err-%DATE%.log',
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  mailtrap: {
    host: process.env.MAILTRAP_HOST ?? 'smtp.mailtrap.io',
    port: process.env.MAILTRAP_PORT ?? 2525,
    secure: process.env.MAILTRAP_SECURE === 'true',
    auth: {
      user: process.env.MAILTRAP_USER ?? '475bf2b4acf4f2',
      pass: process.env.MAILTRAP_PASS ?? '80c026ed507184',
    },
  },
  mail: {
    officialMail: process.env.OFFICIAL_MAIL ?? 'noreply@villahome.am',
    templatesDir: process.env.MAIL_TEMPLATES_DIRECTORY ?? './templates',
  },
});
