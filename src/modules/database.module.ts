import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
dotenv.config();
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from 'src/constants/constants';
import { Task } from 'src/models/task.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return {
          dialect: 'mysql',
          host: config.get(DB_HOST),
          port: +config.get(DB_PORT),
          username: config.get(DB_USERNAME),
          password: config.get<string>(DB_PASSWORD),
          database: config.get(DB_DATABASE),
          models: [Task],
          synchronize: true,
          autoLoadModels: true,
          logging: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
