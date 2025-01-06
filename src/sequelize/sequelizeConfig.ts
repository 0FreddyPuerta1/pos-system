import { ConfigService } from '@nestjs/config';
import { models } from './models';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => {
  return {
    dialect: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    models: models,
    autoLoadModels: true,
    synchronize: true,
    logging:
      configService.get<string>('NODE_ENV') === 'development'
        ? console.log
        : false,
  };
};
