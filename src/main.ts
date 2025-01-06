import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from './adapters/logger.adapter';
import * as helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(helmet.default());
  const logger = app.get(AppLogger);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  logger.info(`Server running on port: ${port}`);
}
bootstrap();
