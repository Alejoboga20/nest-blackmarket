import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { SwaggerModule } from '@nestjs/swagger';

import { swaggerConfig, validationPipeOptions } from '@common/config';
import { ApiVersion } from '@common/constants/versions';
import { DOCUMENTATION_PATH } from '@common/constants/paths';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(ApiVersion.V1);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(DOCUMENTATION_PATH, app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
