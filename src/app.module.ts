import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppLogger } from './adapters/logger.adapter';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { sequelizeConfig } from './sequelize/sequelizeConfig';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        sequelizeConfig(configService),
    }),
    ThrottlerModule.forRoot([{ limit: 10, ttl: 60000 }]),
    ConfigModule.forRoot({ envFilePath: ['.env.development'], isGlobal: true }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppLogger,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
