import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'info',
      transports: [
        //console logging
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
            ),
          ),
        }),

        //info level Logging
        new winston.transports.File({
          filename: 'logs/app.log',
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
            ),
          ),
        }),

        //error level logging
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
            ),
          ),
        }),
      ],
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
