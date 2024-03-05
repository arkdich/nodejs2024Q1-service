import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

const PORT = Number(process.env.PORT);

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const appReflector = app.get(Reflector);

  const pipes = [new ValidationPipe()];
  const interceptors = [new ClassSerializerInterceptor(appReflector)];

  app.useGlobalPipes(...pipes);
  app.useGlobalInterceptors(...interceptors);

  await app.listen(PORT);
};

bootstrap();
