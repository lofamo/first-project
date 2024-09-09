import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  app.enableCors({});
  await app.listen(config.get<number>('port') || 3003);

  Logger.log(
    'App running at http://localhost:' + config.get<number>('port') || 3003,
    'NestApplication',
  );
}
bootstrap();
