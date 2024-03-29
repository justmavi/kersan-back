import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  app.setGlobalPrefix('api');

  await app.listen(process.env.HTTP_PORT);

  console.log('Now listening port', process.env.HTTP_PORT);
}
void bootstrap();
