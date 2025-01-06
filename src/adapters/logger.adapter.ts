import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import * as path from 'path';
import { ILogger } from 'src/interfaces/logger.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppLogger implements ILogger {
  private readonly logger;

  constructor(private readonly configService: ConfigService) {
    const isProduction = configService.get<string>('NODE_ENV') === 'production';

    const consoleFormat = format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ level, message, timestamp, context }) => {
        return `[${timestamp}] [${level}]${
          context ? ' [' + context + ']' : ''
        } ${message}`;
      }),
    );

    const transportArray: (
      | transports.ConsoleTransportInstance
      | transports.FileTransportInstance
    )[] = [
      new transports.Console({
        format: consoleFormat,
      }),
    ];

    if (isProduction) {
      transportArray.push(
        new transports.File({
          filename: path.join(
            __dirname,
            `../../logs/log-${new Date().toISOString().split('T')[0]}.log`,
          ),
          format: format.combine(format.timestamp(), format.json()),
        }),
      );
    }

    this.logger = createLogger({
      level: 'debug',
      transports: transportArray,
    });
  }

  info(message: any, context?: string) {
    this.logger.info({ message, context });
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error({ message, trace, context });
  }

  warn(message: any, context?: string) {
    this.logger.warn({ message, context });
  }

  debug(message: any, context?: string) {
    this.logger.debug({ message, context });
  }
}
