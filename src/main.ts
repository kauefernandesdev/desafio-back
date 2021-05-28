import { NestFactory } from '@nestjs/core';

import { getVariable } from './config';

import { AppModule } from './app.module';

import { ValidationExceptionFilter } from './validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ValidationExceptionFilter());

  await app.listen(getVariable('APP_PORT'));
}

bootstrap();
