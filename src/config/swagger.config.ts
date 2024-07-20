import { DocumentBuilder } from '@nestjs/swagger'

export function swaggerConfig() {
  return new DocumentBuilder()
    .setTitle('NestJS Boilerplate')
    .setDescription('NestJS Boilerplate API')
    .setVersion('1.0')
    .build()
}
