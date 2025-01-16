import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksModule } from './tasks.module';
import { DatabaseModule } from './database.module';
import { LoggerModule } from './logger.module';
import { RequestLoggerMiddleware } from '../middlewares/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { AppExceptionFilter } from '../filters/app-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisConfigs } from 'src/redis/redis.config';
import { RabbitMQClientProvider } from 'src/broker/rabbitmq.provider';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //Global Config Module
    TasksModule,
    DatabaseModule, //Database Module
    LoggerModule, //Logger Module
    CacheModule.register(RedisConfigs), //reddis cache
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER, //Global Exception Filter
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //Global Request Response logging middleware
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
