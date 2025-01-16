import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateTaskDto } from 'src/dtos/create-task.dto';
import { UpdateTaskDto } from 'src/dtos/update-task.dto';
import { Priority, Task, TaskStatus } from 'src/models/task.entity';
import { Logger } from 'winston';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_CLIENT } from 'src/constants/constants';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    @Inject(RABBITMQ_CLIENT) private rabbitMqClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async createTask(taskDto: CreateTaskDto): Promise<Task> {
    try {
      if (!taskDto.status) {
        taskDto.status = TaskStatus.PENDING;
      }
      if (!taskDto.priority) {
        taskDto.priority = Priority.LOW;
      }
      const task = await this.taskRepository.create<Task>(taskDto);

      //publish task created message to queue
      this.rabbitMqClient.emit('task_created', task);

      this.logger.info(
        `Task Created with Id: ${task.id}, Response Object: ${JSON.stringify(task)}`,
      );
      return task;
    } catch (error) {
      throw new HttpException(
        'Failed to Save the Task!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllTask(): Promise<Task[]> {
    const cachedTasks: string = await this.cacheManager.get('tasks');
    if (cachedTasks) {
      this.logger.info('Fetched Tasks from Cache!');
      return JSON.parse(cachedTasks);
    }
    this.logger.info('Fetching Tasks from Database!');
    const tasks = await this.taskRepository.findAll();
    this.cacheManager.set('tasks', JSON.stringify(tasks));
    return tasks;
  }

  async getTaskByTaskId(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findByPk(taskId);
    if (!task) {
      throw new NotFoundException(`Task with id: ${taskId} not found!`);
    }
    this.logger.info(
      `Fetched Task for id ${taskId} Response Object: ${JSON.stringify(task)}`,
    );
    return task;
  }

  async updateTask(
    taskId: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.taskRepository.findByPk(taskId);
    if (!task) {
      throw new NotFoundException(`Task with id: ${taskId} not found!`);
    }
    const updatedTask = await task.update(updateTaskDto);
    //publish update task message to queue
    this.rabbitMqClient.emit('task_updated', task);

    this.logger.info(
      `Updated task for id: ${taskId}, Updated Object: ${JSON.stringify(updatedTask)}`,
    );
    return updatedTask;
  }

  async deleteTask(taskId: number): Promise<void> {
    const task = await this.taskRepository.findByPk(taskId);
    if (!task) {
      throw new NotFoundException(`Task with id: ${taskId} not found!`);
    }
    await task.destroy();
    //publish delete task message to queue
    this.rabbitMqClient.emit(
      'task_deleted',
      `Task with id ${taskId} deleted Successfully!`,
    );
    this.logger.info(`Deleted Task for id: ${taskId}`);
  }
}
