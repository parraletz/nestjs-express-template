import { DocumentBuilder } from '@nestjs/swagger'

export const configDocs = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('api')
    .addApiKey({
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header'
    })
    .build()

