import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RabbitMQClientProvider } from 'src/broker/rabbitmq.provider';
import { TasksController } from 'src/controllers/tasks.controller';
import { Task } from 'src/models/task.entity';
import { TasksService } from 'src/services/tasks.service';

@Module({
  providers: [TasksService, RabbitMQClientProvider],
  imports: [SequelizeModule.forFeature([Task])],
  controllers: [TasksController],
})
export class TasksModule {}
