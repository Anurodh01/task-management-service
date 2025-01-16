import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateTaskDto } from 'src/dtos/create-task.dto';
import { UpdateTaskDto } from 'src/dtos/update-task.dto';
import { TasksService } from 'src/services/tasks.service';
import { Logger } from 'winston';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  //CREATE TASK
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  //GET ALL TASKS
  @Get()
  getAllTask() {
    return this.tasksService.getAllTask();
  }

  ///GET TASK BY ID
  @Get(':taskId')
  getTaskByTaskId(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.tasksService.getTaskByTaskId(taskId);
  }

  //UPDATE TASK
  @Put(':taskId')
  updateTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(taskId, updateTaskDto);
  }

  //DELETE TASK
  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.tasksService.deleteTask(taskId);
  }
}
