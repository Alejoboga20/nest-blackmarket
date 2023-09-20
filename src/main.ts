import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
