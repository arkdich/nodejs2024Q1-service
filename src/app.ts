import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from './modules/user/model/user.entity';

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

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5000,
  username: 'root',
  password: 'admin',
  database: 'home-library',
  entities: [UserEntity],
  synchronize: true,
  logging: false,
});

appDataSource.initialize();
