import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'reflect-metadata'
// import { swaggerConfig } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger'
import { swaggerConfig } from './config/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const documentConfig = swaggerConfig()
  const document = SwaggerModule.createDocument(app, documentConfig)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
