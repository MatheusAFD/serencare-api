import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'

async function bootstrap() {
  const API_PORT = process.env.NEST_API_PORT ?? 4000

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(API_PORT, '0.0.0.0')
}
bootstrap()
