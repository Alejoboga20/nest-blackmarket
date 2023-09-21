import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Blackmarket API')
  .setDescription('Blackmarket API documentation')
  .setVersion('1.0')
  .addBearerAuth({
    description: 'JWT Token format: Bearer <JWT>',
    type: 'http',
    in: 'Header',
    scheme: 'Bearer',
    bearerFormat: 'Bearer',
    name: 'Authorization',
  })
  .build();
