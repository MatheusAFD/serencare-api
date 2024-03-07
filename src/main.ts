import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const API_PORT = process.env.NEST_API_PORT ?? 4000

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('SerenCare Example')
      .setDescription('The SerenCare API description')
      .setVersion('1.0')
      .addTag('SerenCare')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header'
        },
        'JWT-auth'
      )
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/swagger', app, document)
  }

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(API_PORT, '0.0.0.0')
}
bootstrap()
