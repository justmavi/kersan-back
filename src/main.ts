import { GlobalExceptionFilter } from 'src/common/exceptions/global.exception-filter';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.HTTP_PORT);

  console.log('Now listening port', process.env.HTTP_PORT);
}
void bootstrap();
