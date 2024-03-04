import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = Number(process.env.PORT);

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
};

bootstrap();
