import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'
import { configDocs } from './config/docs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  app.useLogger(app.get(Logger))
  const logger = app.get(Logger)
  const configService = app.get(ConfigService)

  const port = configService.get<number>('port')
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1'
  })
  const swggaerOptions: SwaggerCustomOptions = {
    useGlobalPrefix: true,
    jsonDocumentUrl: '/docs-json'
  }
  const document = SwaggerModule.createDocument(app, configDocs)

  SwaggerModule.setup('/docs', app, document, swggaerOptions)

  await app.listen(port, '0.0.0.0') // That is important to run on docker, cause we are using fastify
  logger.log(`🚀 Server running on port: ${port}`)
}

bootstrap()
