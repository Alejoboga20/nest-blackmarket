import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { SwaggerModule } from '@nestjs/swagger';

import { swaggerConfig, validationPipeOptions } from '@common/config';
import { AppModule } from './app.module';

enum ApiVersion {
  V1 = 'api/v1',
}

const DOCUMENTATION_PATH = `${ApiVersion.V1}/docs`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(ApiVersion.V1);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(DOCUMENTATION_PATH, app, document);

  await app.listen(3000);
}
bootstrap();
