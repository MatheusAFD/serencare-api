import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const API_PORT = process.env.NEST_API_PORT ?? 4000;

  const app = await NestFactory.create(AppModule);
  await app.listen(API_PORT);
}
bootstrap();
